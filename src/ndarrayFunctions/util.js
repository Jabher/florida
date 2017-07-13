//@flow
import ndarray from "ndarray";
import type { Shape } from "../types";

export const zeros = (shape: Shape) =>
  ndarray(new Float32Array(shape.reduce((a, b) => a * b, 1)), shape);
