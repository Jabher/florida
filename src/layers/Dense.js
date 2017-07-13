import { ConfigurableLayer, Optimizer } from "../";
import { zeros } from "../ndarrayFunctions/util";
import ndarray from "ndarray";
import gemm from "ndarray-gemm";
import R from "ramda";

//todo bias

export class Dense extends ConfigurableLayer<number> {
  compileShape() {
    if (this.inputShape.length !== 2) {
      throw new Error(
        "expected 2-dim matrix input, instead got " +
          JSON.stringify(this.inputShape)
      );
    }
    return [1, this.config];
  }

  weights: ndarray;

  compile() {
    const weights = (this.weights = zeros([
      this.inputShape[1],
      this.outputShape[1]
    ]));
    const transposedWeights = weights.transpose(1, 0);
    const output = zeros(R.reverse(this.outputShape));
    const transposedOutput = output.transpose(1, 0);
    const gradient = zeros(this.inputShape);
    return {
      permuteInput: (data: ndarray) => {
        gemm(transposedOutput, 1, 1, data, weights);
        console.log("output", output);
        return output;
      },
      permuteGradient: (data: ndarray) => {
        gemm(gradient, 1, 1, data.transpose(1, 0), transposedWeights);
        console.log("gradient", gradient);
        return gradient;
      },
      compileApplyOptimizer: (optimizer: Optimizer) => (gradient: ndarray) => {
        console.log(gradient);
      }
    };
  }
}
