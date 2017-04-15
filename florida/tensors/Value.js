//@flow
import {Tensor} from './Tensor';
import type {InitValue, Shape} from './types';

export class Value extends Tensor {
    constructor(shape: Shape, init: InitValue) {
        super(shape);
        this.init = init;
    }
}