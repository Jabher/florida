//@flow
import { LossFunction } from "./LossFunction";
import ndarray from 'ndarray';
import type { Shape } from "../types";

class Loss extends LossFunction {
  compile(shape: Shape) {
    return {
      d0: ({ y, yPred }: { y: ndarray, yPred: ndarray }) => y,
      d1: ({ y, yPred }: { y: ndarray, yPred: ndarray }) => y,
    }
  }
}

test('lossFunctions function forces user to override compile method', () => {
  expect(() => new LossFunction()._compile([])).toThrow();
});

test('lossFunctions function compiles properly on first time', () => {
  new Loss()._compile([]);
});

test('lossFunctions function caches compilation result', () => {
  const loss = new Loss();
  expect(loss._compile([])).toBe(loss._compile([]));
});

test('lossFunctions function is throwing an error when attempting to re-compile it with different shape', () => {
  const loss = new Loss();
  loss._compile([]);
  expect(() => loss._compile([1,2,3])).toThrow();
});