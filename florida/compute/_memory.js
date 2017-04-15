//@flow

import type {ITensor, InitValue, Shape} from '../tensors/types';
import ndarray from 'ndarray';
import zeros from 'zeros';
export {default as ndarray} from 'ndarray';
const values = new WeakMap();

export function get(tensor: ITensor): ndarray {
    return values.get(tensor);
}

export function init(init: ?InitValue, shape: Shape) {
    if (init !== undefined) {
        if (typeof init === 'number')
            init = [init];
        if (Array.isArray(init))
            init = new Float32Array(init);

        return ndarray(init, shape);
    } else {
        return zeros(shape);
    }
}

export function set(tensor: ITensor, value: ndarray) {
    values.set(tensor, value);
}