//@flow
import * as ndarray from 'ndarray';
import cwise from 'cwise';

//todo implement correct logic (not data-based, but offset-based)

export const axpy: (a: number, x: ndarray, y: ndarray) => void = cwise({
  args: ['scalar', 'array', 'array'],
  funcName: 'axpy',
  body: function(a, x, y) {
    // noinspection JSUnusedAssignment
    y += x * a;
  }
});
export const cpsc: (a: number, x: ndarray, y: ndarray) => void = cwise({
  args: ['scalar', 'array', 'array'],
  funcName: 'cpsc',
  body: function(a, x, y) {
    // noinspection JSUnusedAssignment
    y = x * a;
  }
});