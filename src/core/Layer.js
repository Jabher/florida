// @flow

import * as R from 'ramda';
import { Observable } from "rxjs/Observable";
import { Optimizer } from "./Optimizer";
import * as ndarray from 'ndarray';
import type {Shape, IHandler} from "../types";

export class Layer {
  inputShape: Shape;
  outputShape: Shape;

  compilation: {
    permuteInput: IHandler;
    permuteGradient: IHandler;
    compileApplyOptimizer: (optimizer: Optimizer) => (gradient: ndarray) => void;
  };

  constructor() {
    if (this.constructor === Layer) {
      throw new Error("cannot directly instantate Layer class")
    }
  }

  get isCompiled(): boolean { return this.compilation !== undefined; }

  _compile(inputShape: Shape) {
    if (this.isCompiled) {
      if (!R.equals(inputShape, this.inputShape)) {
        throw new Error('cannot re-_compile already compiled layer');
      }
    } else {
      this.inputShape = inputShape;
      this.outputShape = this.compileShape();
      this.compilation = this.compile();
    }
  }

  compileShape() {
    return this.inputShape;
  }

  compile(): { permuteInput: IHandler, permuteGradient: IHandler, compileApplyOptimizer: (optimizer: Optimizer) => (gradient: ndarray) => void } {
    throw new Error("cannot use Layer.compile; you should re-define it yourself in class " + this.constructor.name)
  }
}