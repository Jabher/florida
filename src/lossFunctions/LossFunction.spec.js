// @flow
import { LossFunction } from "./LossFunction";
import ndarray from "ndarray";

class Loss extends LossFunction {
  _compile() {
    return {
      d0: ({ y, yPred }: { y: ndarray, yPred: ndarray }) => y,
      d1: ({ y, yPred }: { y: ndarray, yPred: ndarray }) => y,
    };
  }
}

test("lossFunctions function forces user to override compile method", () => {
  expect(() => new LossFunction().compile([])).toThrow();
});

test("lossFunctions function compiles properly on first time", () => {
  new Loss().compile([]);
});

test("lossFunctions function caches compilation result", () => {
  const loss = new Loss();
  expect(loss.compile([])).toBe(loss.compile([]));
});

test("lossFunctions function is throwing an error when attempting to re-compile it with different shape", () => {
  const loss = new Loss();
  loss.compile([]);
  expect(() => loss.compile([1, 2, 3])).toThrow();
});
