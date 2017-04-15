//@flow
import {ndarray} from '../_memory';
import {l1} from './blas';

export const minusOneNumber = ndarray(new Float32Array([-1]), [1, 1]);
export const plusOneNumber = ndarray(new Float32Array([+1]), [1, 1]);
