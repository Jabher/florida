// @flow

import ndarray from 'ndarray';
import type { Shape } from "../types";

export class Optimizer {
  // noinspection JSUnusedLocalSymbols
  compile(shape: Shape): (gradient: ndarray) => void {
    throw new Error(`"compile" method of optimizer ${this.constructor.name} should be defined`)
  }
}