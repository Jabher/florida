// @flow
import * as ndarray from 'ndarray';
import { Optimizer } from "./Optimizer";
import { blas, zeros } from "../ndarrayFunctions";

const {
  l1: { axpy },
  l3: { gemm },
} = blas;

export class SGD extends Optimizer {
  compile(weights: ndarray) {
    const delta = zeros(weights.shape);
    const transposedDelta = delta.transpose(1, 0);
    const learningRate = this.learningRate;
    return (gradient: ndarray, input: ndarray) => {
      gemm(transposedDelta, gradient, input);
      axpy(-learningRate, delta, weights);
    }
  }
}
