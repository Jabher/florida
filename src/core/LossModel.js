// @flow

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import * as ndarray from 'ndarray';
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import { LossFunction } from './LossFunction';
import { Optimizer } from './Optimizer';
import { BaseModel } from './Model';
import { OptimizingModel } from './OptimizingModel';
import type { ICompilable, ILossHandler, ILossInput, ILossOutput, Shape } from "../types";
import { asum } from "ndarray-blas-level1";


export class LossModel implements ICompilable<ILossInput, ndarray> {
  lossFn: LossFunction;
  inputModel: BaseModel;
  output: Subject<ndarray, ndarray> = new Subject();
  outputShape: Shape;
  lossFnCompilation: { d0: ILossHandler, d1: ILossHandler };

  constructor(lossFn: LossFunction, inputModel: BaseModel) {
    this.lossFnCompilation = lossFn._compile(inputModel.outputShape);
    this.lossFn = lossFn;
    this.inputModel = inputModel;
    this.outputShape = inputModel.outputShape;
  }

  optimize(optimizer: Optimizer): OptimizingModel {
    return new OptimizingModel(this, optimizer);
  }

  compile<SI: any>(input: Subject<SI, ILossInput> = new Subject()): Subject<SI, number> {
    return this.compileInput(this.compileModelOutput(input.share()));
  }

  compileModelOutput<SI: any>(_input: Subject<SI, ILossInput>): Subject<SI, ILossOutput> {
    const input = _input.share();
    return input
      .map(({ y }) => y)
      .withLatestFrom(
        this.inputModel.compileInput(input.map(({ x }) => x)),
        (y: ndarray, yPred: ndarray) => ({ yPred, y }))
      .share();
  }

  compileInput<SI: any>(input: Subject<SI, ndarray>): Subject<SI, ndarray> {
    const scaler = this.outputShape.reduce((a, b) => a * b, 1);

    const output = input
      .map(this.lossFnCompilation.d0)
      .map(asum)
      .map(sum => sum / scaler)
      .share();
    output.subscribe(this.output);
    return output;
  }

  applyGradientOptimizer<SI>(optimizer: Optimizer, gradient: Subject<SI, ndarray>): void {
    const lossGradient = gradient.map(this.lossFnCompilation.d1);

    this.inputModel.applyGradientOptimizer(optimizer, lossGradient);
  }
}