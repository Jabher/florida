//@flow
import { LossFunction } from "./LossFunction";
import { ndarray } from "ndarray";
import { blas, dotProduct, zeros } from "../ndarrayFunctions";

export class MSE extends LossFunction {
  _compile() {
    const shape = this.inputShape;
    const cost0 = zeros(shape);
    const cost1 = zeros(shape);
    return {
      d0: (y: ndarray, yPred: ndarray) => {
        //noinspection JSSuspiciousNameCombination
        blas.l1.cpsc(-1, yPred, cost0);
        //noinspection JSSuspiciousNameCombination
        blas.l1.axpy(1, y, cost0);
        return dotProduct(cost0, cost0);
      },
      d1: (y: ndarray, yPred: ndarray) => {
        //noinspection JSSuspiciousNameCombination
        blas.l1.cpsc(2, yPred, cost1);
        //noinspection JSSuspiciousNameCombination
        blas.l1.axpy(-2, y, cost1);
        return cost1;
      },
    };
  }
}