// @flow

import ndarray from 'ndarray';

export class Optimizer {
  compile(shape: number[]): (gradient: ndarray) => void {
    throw new Error(`"compile" method of optimizer ${this.constructor.name} should be defined`)
  }
}