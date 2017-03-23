//@flow

import {Tensor} from './Tensor';
import ndarray from 'ndarray';
const values = new WeakMap();

export function get(tensor: Tensor): ndarray {
    const value = values.get(tensor);
    if (value) {
        return value;
    } else {
        const value = tensor.bootstrap();
        set(tensor, value);
        return value;
    }
}

export function set(tensor: Tensor, value: ndarray) {
    values.set(tensor, value);
}