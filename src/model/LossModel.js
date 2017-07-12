// @flow

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import * as ndarray from "ndarray";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import { LossFunction } from "../lossFunctions/LossFunction";
import { BaseModel } from "./Model";
import type { ICompilable, ILossHandler, ILossInput, Shape } from "../types";
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

  compile<SI: any>(_input: Subject<SI, ILossInput> = new Subject()): Subject<SI, number> {
    const input = this.inputModel.compileWithOutput(_input.share());

    const scaler = this.outputShape.reduce((a, b) => a * b, 1);

    const output = input
      .map(this.lossFnCompilation.d0)
      .map(asum)
      .map(sum => sum / scaler)
      .share();
    output.subscribe(this.output);
    return output;
  }
}