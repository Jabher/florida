// @flow

import { LossModel } from './LossModel';
import { Optimizer } from './Optimizer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import ndarray from 'ndarray';
import type { ICompilable, ILossInput, ILossOutput, Shape } from '../types';

export class OptimizingModel implements ICompilable<ILossInput, ndarray> {
  lossModel: LossModel;
  outputShape: Shape;
  optimizer: Optimizer;

  constructor(lossModel: LossModel, optimizer: Optimizer) {
    this.lossModel = lossModel;
    this.outputShape = this.lossModel.outputShape;
    this.optimizer = optimizer;
  }

  compile<SI>(input: Subject<SI, ILossInput> = new Subject()): Subject<SI, ILossOutput> {
    const modelOutput = this.lossModel.compileModelOutput(input).share();
    this.lossModel.applyGradientOptimizer(this.optimizer, modelOutput);
    return this.lossModel.compileInput(modelOutput);
  }
}