//@flow
import {get} from '../_memory';
import {l1, l3} from './blas';
import type {ITensor} from '../../tensors/types';
import {plusOneNumber, minusOneNumber} from './_constants';

export const multiply = (result: ITensor, x: ITensor, y: ITensor) => () => {
    l3.gemm(get(result), get(x), get(y))
};

export const copy = (result: ITensor, x: ITensor) => () => {
    l1.copy(get(x), get(result));
};

export const axpy = (a: ITensor, x: ITensor, y: ITensor) => () => {
    l1.axpy(get(a), get(x), get(y));
};

export const add = (x: ITensor, y: ITensor) => () => {
    l1.axpy(plusOneNumber, get(x), get(y));
};

export const toZeros = (target: ITensor) => () => {
    l1.axpy(minusOneNumber, get(target), get(target));
};