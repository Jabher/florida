// @flow
import * as R from 'ramda';
import type { ILossCompilation, Shape } from '../types';

export class LossFunction {
  inputShape: ?Shape;
  compilation: ILossCompilation;

  _compile(shape: number[]): ILossCompilation {
    if (!this.compilation) {
      this.compilation = this.compile(shape);
      this.inputShape = shape;
    } else if (!R.equals(this.inputShape, shape)) {
      throw new Error('cannot re-initialize lossFunctions function with different shape')
    }
    return this.compilation;
  }

  compile(shape: number[]): ILossCompilation {
    throw new Error('method "compile" is not implemented yet');
  }
}