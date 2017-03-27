import {Tensor} from './Tensor';
import type {InitValue, Shape} from './types';

export class TemporaryTensor extends Tensor {
    persistent = false;
}

export class Value extends TemporaryTensor {
    constructor(shape: Shape, init: InitValue) {
        super(shape);
        this.init = init;
    }
}

export class Placeholder extends TemporaryTensor {}
