//@flow
import ndarray from "ndarray";

export function dotProduct(x: ndarray, y: ndarray) {
  let i;
  const dx = x.data;
  const dy = y.data;
  const ox = x.stride[0];
  const oy = y.stride[0];
  let px = x.offset;
  let py = y.offset;
  for (i = x.shape[0] - 1; i >= 0; i--, px += ox, py += oy) {
    dy[py] = dy[py] * dx[px];
  }
  return y;
}
