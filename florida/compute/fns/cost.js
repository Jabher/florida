//@flow
import {get} from '../_memory';
import {l1} from './blas';
import type {ITensor} from '../../tensors/types';
import {minusOneNumber} from './_constants';


export const mse = (result: ITensor, x: ITensor, y: ITensor) => () => {
    l1.copy(get(y), get(result));
    l1.axpy(minusOneNumber, get(x), get(result));
};