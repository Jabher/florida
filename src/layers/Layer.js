// @flow

import * as R from "ramda";
import { Observable } from "rxjs/Observable";
import ndarray from "ndarray";
import type { IHandler, IOptimizer, Shape } from "../types";

export class Layer<O: any> {
  inputShape: Shape;
  outputShape: Shape;

  compilation: {
    permuteInput: IHandler,
    permuteGradient: IHandler,
    compileApplyOptimizer: (optimizer: IOptimizer) => (gradient: ndarray, input: ndarray) => void
  };

  options: O;

  constructor(options: O) {
    if (this.constructor === Layer) {
      throw new Error("cannot directly instantiate Layer class");
    }
    this.options = options;
  }

  get isCompiled(): boolean {
    return this.compilation !== undefined;
  }

  compile(inputShape: Shape) {
    if (this.isCompiled) {
      if (!R.equals(inputShape, this.inputShape)) {
        throw new Error("cannot re-compile already compiled layer");
      }
    } else {
      this.inputShape = inputShape;
      this.outputShape = this.compileShape();
      this.compilation = this._compile();
    }
  }

  compileShape() {
    return this.inputShape;
  }

  _compile(): {
    permuteInput: IHandler,
    permuteGradient: IHandler,
    compileApplyOptimizer: (optimizer: IOptimizer) => (gradient: ndarray) => void
  } {
    throw new Error(
      "cannot use Layer.compile; you should re-define it yourself in class " +
      this.constructor.name,
    );
  }
}

export class ConfigurableLayer<T> extends Layer {
  config: T;

  constructor(config: T) {
    super();
    this.config = config;
  }
}
