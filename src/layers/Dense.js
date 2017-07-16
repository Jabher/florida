import ndarray from "ndarray";
import R from "ramda";
import { Layer } from "./Layer";
import { blas, ops, zeros } from "../ndarrayFunctions";
import type { IOptimizer } from "../types";

const gemm = blas.l3.gemm;

//todo bias

export class Dense extends Layer<number> {
  weights: ndarray;

  compileShape() {
    if (this.inputShape.length !== 2) {
      throw new Error(
        "expected 2-dim matrix input, instead got " +
        JSON.stringify(this.inputShape),
      );
    }
    return [1, this.options];
  }

  _compile() {
    const weights = this.weights = zeros([
      this.inputShape[1],
      this.outputShape[1],
    ]);

    ops.random(weights);

    const transposedWeights = weights.transpose(1, 0);
    const output = zeros(R.reverse(this.outputShape));
    const transposedOutput = output.transpose(1, 0);
    const gradient = zeros(this.inputShape);
    return {
      permuteInput: (data: ndarray) => {
        gemm(transposedOutput, data, weights);
        return transposedOutput;
      },
      permuteGradient: (data: ndarray) => {
        gemm(gradient, data, transposedWeights);
        return gradient;
      },
      compileApplyOptimizer: (optimizer: IOptimizer) => optimizer.compile(weights),
    };
  }
}
