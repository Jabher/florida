// @flow
import * as R from "ramda";
import type { ILossCompilation, Shape } from "../types";

export class LossFunction {
  inputShape: Shape;
  compilation: ILossCompilation;

  compile(shape: number[]): ILossCompilation {
    if (!this.compilation) {
      this.inputShape = shape;
      this.compilation = this._compile();
    } else if (!R.equals(this.inputShape, shape)) {
      throw new Error(
        "cannot re-initialize lossFunctions function with different shape"
      );
    }
    return this.compilation;
  }

  _compile(): ILossCompilation {
    throw new Error('method "compile" is not implemented yet');
  }
}
