// @flow

import * as R from 'ramda';
import { Observable } from "rxjs/Observable";
import * as ndarray from 'ndarray';
import type {Shape, IHandler, IOptimizer} from "../types";

export class Layer {
  inputShape: Shape;
  outputShape: Shape;

  compilation: {
    permuteInput: IHandler;
    permuteGradient: IHandler;
    compileApplyOptimizer: (optimizer: IOptimizer) => (input: ndarray, gradient: ndarray) => void;
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

  compile(): { permuteInput: IHandler, permuteGradient: IHandler, compileApplyOptimizer: (optimizer: IOptimizer) => (gradient: ndarray) => void } {
    throw new Error("cannot use Layer.compile; you should re-define it yourself in class " + this.constructor.name)
  }
}

export class ConfigurableLayer<T> extends Layer {
  config: T;
  constructor(config: T) {
    super();
    this.config = config;
  }
}