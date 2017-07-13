// @flow
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/first";
import { Model } from "./Model";
import { Layer } from "../layers/Layer";
import ndarray from "ndarray";
import { axpy, cpsc } from "ndarray-blas-level1";
import { LossFunction } from "../lossFunctions/LossFunction";
import { zeros } from "../ndarrayFunctions/util";
import { dotProduct } from "../ndarrayFunctions/dotProduct";
import R from "ramda";
import type { IOptimizer, Shape } from "../types";

test("model have shape", () => {
  const model = new Model([1, 2]);
  expect(model).toHaveProperty("outputShape", [1, 2]);
});

class BaseTestLayer extends Layer {
  _compile() {
    return {
      permuteInput: (data: ndarray) => data,
      permuteGradient: (gradient: ndarray) => gradient,
      // noinspection JSUnusedLocalSymbols
      compileApplyOptimizer: (optimizer: IOptimizer) => (
        gradient: ndarray
      ) => {}
    };
  }
}

class MSE extends LossFunction {
  _compile() {
    const shape = this.inputShape;
    const error0 = zeros(shape);
    const error1 = zeros(shape);
    return {
      d0: (y: ndarray, yPred: ndarray) => {
        //noinspection JSSuspiciousNameCombination
        cpsc(-1, yPred, error0);
        //noinspection JSSuspiciousNameCombination
        axpy(1, y, error0);
        return dotProduct(error0, error0);
      },
      d1: (y: ndarray, yPred: ndarray) => {
        //noinspection JSSuspiciousNameCombination
        cpsc(2, yPred, error1);
        //noinspection JSSuspiciousNameCombination
        axpy(-2, y, error1);
        return error1;
      }
    };
  }
}

test("model is producing a lossFunctions", async () => {
  class NonceLayer extends BaseTestLayer {
    _compile() {
      return {
        permuteInput: (data: ndarray) => data,
        permuteGradient: (gradient: ndarray) => gradient,
        // noinspection JSUnusedLocalSymbols
        compileApplyOptimizer: (optimizer: IOptimizer) => (
          gradient: ndarray,
          input: ndarray
        ) => {}
      };
    }
  }

  const model = new Model([2]).pipe(new NonceLayer()).loss(new MSE()).compile();

  const promise = model.first().toPromise();

  model.next({
    x: ndarray(new Float32Array([-1, -2]), [2]),
    y: ndarray(new Float32Array([-3, -5]), [2])
  });

  expect(await promise).toEqual(
    R.mean([Math.pow(-1 - -3, 2), Math.pow(-2 - -5, 2)])
  );
});
