// @flow
import "rxjs/add/operator/share";
import "rxjs/add/operator/map";
import "rxjs/add/operator/withLatestFrom";
import { asum } from "ndarray-blas-level1";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Layer } from "../layers/Layer";
import * as ndarray from "ndarray";
import { LossFunction } from "../lossFunctions/LossFunction";
import { LossModel } from "./LossModel";
import type { ICompilable, ILossInput, ILossOutput, IOptimizer, Shape } from "../types";


interface ICompilableModel<I, O> extends ICompilable <I, O> {
  compileInput<SI>(input: Subject<SI, I>): Subject<SI, O>;
}

export class BaseModel implements ICompilableModel<ndarray, ndarray> {
  inputModel: ?BaseModel;
  inputShape: Shape;
  outputShape: Shape;
  output: Subject<ndarray, ndarray> = new Subject();
  gradient: Subject<ndarray, ndarray> = new Subject();

  constructor(inputShape: Shape, outputShape: Shape, input: ?BaseModel) {
    this.inputShape = inputShape;
    this.outputShape = outputShape;
    this.inputModel = input;
  }

  pipe(layer: Layer) { return new PipedModel(layer, this); }

  loss<T: Object>(lossFn: LossFunction): LossModel { return new LossModel(lossFn, this); }

  compile<SI>(input: Subject<SI, ndarray> = new Subject()): Subject<SI, ndarray> { return this.compileInput(input); }

  // _compile<SI>(input: Subject<SI, ndarray> = new Subject(), gradient: Subject<any, ndarray>) {
  //
  // }

  compileWithOutput<SI: any>(_input: Subject<SI, ILossInput>): Subject<SI, ILossOutput> {
    const inputModel = this.inputModel;
    if (!inputModel) {
      return _input;
    } else {
      const input = _input.share();
      return input
        .map(({ y }) => y)
        .withLatestFrom(
          inputModel.compileInput(input.map(({ x }) => x)),
          (y: ndarray, yPred: ndarray) => ({ yPred, y }))
        .share();
    }
  }

  optimize(loss: LossFunction, optimizer: IOptimizer): OptimizingModel {
    return new OptimizingModel(this, loss, optimizer);
  }

  compileInput<SI>(input: Subject<SI, ndarray> = new Subject()): Subject<SI, ndarray> {
    const layerInput = this.inputModel
      ? this.inputModel.compileInput(input)
      : input;
    const output = this.permuteInput(layerInput).share();
    output.subscribe(this.output);
    return output;
  }

  applyGradientOptimizer<SI>(optimizer: IOptimizer, _gradient: Subject<SI, ndarray>): void {
    const gradient = _gradient.share();
    gradient.subscribe(this.gradient);
    const compiledOptimizer = this.compileOptimizerApplication(optimizer);
    if (compiledOptimizer) {
      //todo inject input
      gradient.subscribe(compiledOptimizer);
    }
    if (this.inputModel) {
      this.inputModel.applyGradientOptimizer(optimizer, this.permuteGradient(gradient));
    }
  }

  permuteInput(input: Subject<ndarray, ndarray>): Subject<ndarray, ndarray> { return input; }

  permuteGradient(gradient: Subject<ndarray, ndarray>) { return gradient; }

  compileOptimizerApplication(optimizer: IOptimizer): void | (gradient: ndarray) => void {}
}

export class Model extends BaseModel {
  constructor(shape: Shape) {
    super(shape, shape);
  }
}


type Handler = (input: ndarray) => ndarray;

export class PipedModel extends BaseModel {
  layer: Layer;

  constructor(layer: Layer, input: BaseModel) {
    layer._compile(input.outputShape);
    super(layer.inputShape, layer.outputShape, input);
    this.layer = layer;
  }

  get compilation(): {
    permuteInput: Handler;
    permuteGradient: Handler;
    compileApplyOptimizer: (optimizer: IOptimizer) => (gradient: ndarray) => void;
  } { return this.layer.compilation }

  permuteInput(input: Subject<ndarray, ndarray>) {
    return input.map(this.compilation.permuteInput);
  }

  permuteGradient(gradient: Subject<ndarray, ndarray>) {
    return gradient.map(this.compilation.permuteGradient);
  }

  compileOptimizerApplication(optimizer: IOptimizer): void | (gradient: ndarray) => void {
    if (this.compilation.compileApplyOptimizer) {
      return this.compilation.compileApplyOptimizer(optimizer)
    }
  }
}


export class OptimizingModel implements ICompilable<ILossInput, ndarray> {
  inputModel: BaseModel;
  lossFunction: LossFunction;
  inputShape: Shape;
  optimizer: IOptimizer;

  constructor(inputModel: BaseModel, lossFunction: LossFunction, optimizer: IOptimizer) {
    this.inputModel = inputModel;
    this.inputShape = this.inputModel.outputShape;
    this.lossFunction = lossFunction;
    this.optimizer = optimizer;

    this.lossFunction._compile(this.inputShape);
  }

  compile<SI>(input: Subject<SI, ILossInput> = new Subject()): Subject<SI, ILossOutput> {
    const modelOutput = this.inputModel.compileWithOutput(input).share();
    this.inputModel.applyGradientOptimizer(this.optimizer, modelOutput.map(this.lossFunction.compilation.d1));

    const scaler = this.inputShape.reduce((a, b) => a * b, 1);

    return this.inputModel.compileInput(modelOutput)
      .map(this.lossFunction.compilation.d0)
      .map(asum)
      .map(sum => sum / scaler);
  }
}