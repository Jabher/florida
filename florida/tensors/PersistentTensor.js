//@flow
import type {InitValue} from './types';
import {Tensor} from './Tensor';
import {get, set} from '../memory';

export class PersistentTensor extends Tensor {
    persistent = true;
}

export class MemoryCell extends PersistentTensor {
    input: Tensor;
    resettable = true;

    afterPass = [
        () => set(this, get(this.input)),
    ];

    constructor(input: Tensor, init: InitValue) {
        super(input.shape);
        this.init = init;
        this.input = input;
        this.dependencies = [input];
    }
}
