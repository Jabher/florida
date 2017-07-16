// @flow


import ndarray from "ndarray";

export class Optimizer {
  learningRate: number;

  constructor(learningRate: number) {
    this.learningRate = learningRate;
  }

  // noinspection JSUnusedLocalSymbols
  compile(weights: ndarray): (gradient: ndarray, input: ndarray) => void {
    throw new Error(
      `"compile" method of optimizer ${this.constructor.name} should be defined`,
    );
  }
}
