// @flow
import "rxjs/add/operator/share";
import "rxjs/add/operator/map";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/publishBehavior";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import { asum } from "ndarray-blas-level1";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Layer } from "../layers/Layer";
import * as R from "ramda";
import * as ndarray from "ndarray";
import { LossFunction } from "../lossFunctions/LossFunction";
import type { ICompilable, ILossInput, IOptimizer, Shape } from "../types";

export class BaseModel {
  inputModel: ?BaseModel;
  inputShape: Shape;
  outputShape: Shape;
  $output: Subject<ndarray, ndarray> = new Subject();
  $gradient: Subject<ndarray, ndarray> = new Subject();
  $optimizerCalls: Observable<void> = new Subject();

  constructor(inputShape: Shape, outputShape: Shape, input: ?BaseModel) {
    this.inputShape = inputShape;
    this.outputShape = outputShape;
    this.inputModel = input;
    if (this.inputModel) {
      this.inputModel.$optimizerCalls.subscribe(this.$optimizerCalls);
    }
  }

  pipe(layer: Layer) {
    return new PipedModel(layer, this);
  }

  loss(lossFn: LossFunction): LossModel {
    return new LossModel(lossFn, this);
  }

  optimize(loss: LossFunction, optimizer: IOptimizer) {
    return new OptimizingModel(this, loss, optimizer);
  }

  //todo fix types
  compile<SI>(
    $input: Subject<SI, any> = new Subject(),
    $gradient?: Observable<any>,
    optimizer?: IOptimizer
  ): Subject<SI, any> {
    const $output = this._compile($input, $gradient, optimizer).share();
    $output.subscribe(this.$output);
    if ($gradient) {
      $gradient.subscribe(this.$gradient);
    }
    return $output;
  }

  _compile<SI>(
    $input: Subject<SI, ndarray>,
    $gradient?: Observable<ndarray>,
    optimizer?: IOptimizer
  ): Subject<SI, ndarray> {
    return $input;
  }
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
    layer.compile(input.outputShape);
    super(layer.inputShape, layer.outputShape, input);
    this.layer = layer;
  }

  get compilation(): {
    permuteInput: Handler,
    permuteGradient: Handler,
    compileApplyOptimizer: (
      optimizer: IOptimizer
    ) => (gradient: ndarray, input: ndarray) => void
  } {
    return this.layer.compilation;
  }

  _compile<SI>(
    $input_: Subject<SI, ndarray> = new Subject(),
    $gradient?: Observable<ndarray>,
    optimizer?: IOptimizer
  ): Subject<SI, ndarray> {
    const $outputGradient = $gradient
      ? $gradient.map(this.compilation.permuteGradient).share()
      : undefined;
    if (!this.inputModel) {
      return $input_;
    }

    const $input = this.inputModel.compile($input_, $outputGradient, optimizer);

    if (optimizer && $gradient && this.compilation.compileApplyOptimizer) {
      const $optimizerCalls = $gradient
        .withLatestFrom(
          $input,
          this.compilation.compileApplyOptimizer(optimizer)
        )
        .share();
      $optimizerCalls.subscribe();
      $optimizerCalls.subscribe(this.$optimizerCalls);
    }

    return $input.map(this.compilation.permuteInput);
  }
}

export class OptimizingModel extends BaseModel
  implements ICompilable<ILossInput, ndarray> {
  // $FlowFixMe
  inputModel: BaseModel;
  lossFunction: LossFunction;
  inputShape: Shape;
  optimizer: IOptimizer;

  constructor(
    inputModel: BaseModel,
    lossFunction: LossFunction,
    optimizer: IOptimizer
  ) {
    super(inputModel.inputShape, [], inputModel);
    this.lossFunction = lossFunction;
    this.optimizer = optimizer;

    this.lossFunction.compile(this.inputShape);
  }

  // noinspection JSCheckFunctionSignatures
  _compile<SI: any>(
    $input_: Subject<SI, ILossInput> = new Subject()
  ): Subject<SI, number> {
    const $input = $input_.share();
    const $gradient = new Subject();
    const $inputY = $input.map(({ y }) => y).share();
    const $modelY = this.inputModel
      ._compile($input.map(({ x }) => x), $gradient, this.optimizer)
      .share();

    $inputY
      .withLatestFrom($modelY, this.lossFunction.compilation.d1)
      .subscribe($gradient);

    return $inputY
      .withLatestFrom($modelY, this.lossFunction.compilation.d0)
      .map(asum)
      .map(
        R.multiply(1 / this.inputModel.outputShape.reduce((a, b) => a * b, 1))
      );
  }
}

export class LossModel extends BaseModel
  implements ICompilable<ILossInput, ndarray> {
  lossFunction: LossFunction;
  // $FlowFixMe
  inputModel: BaseModel;
  outputShape: Shape;

  constructor(lossFunction: LossFunction, inputModel: BaseModel) {
    lossFunction.compile(inputModel.outputShape);
    super(inputModel.inputShape, [], inputModel);
    this.lossFunction = lossFunction;
  }

  _compile<SI: any>(
    $input_: Subject<SI, ILossInput>,
    $gradient_?: Observable<ndarray>,
    optimizer?: IOptimizer
  ): Subject<SI, number> {
    const $input = $input_.share();
    const $inputY = $input.map(({ y }) => y);
    const $modelY = this.inputModel.compile($input.map(({ x }) => x)).share();

    return $inputY
      .withLatestFrom($modelY, this.lossFunction.compilation.d0)
      .map(asum)
      .map(
        R.multiply(1 / this.inputModel.outputShape.reduce((a, b) => a * b, 1))
      )
      .share();
  }
}
