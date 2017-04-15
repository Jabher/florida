//@flow
import {Tensor} from './Tensor';
import type {ITensor} from './types';
import {copy} from '../compute/fns';

export class MemoryCell extends Tensor {
    input: ITensor;
    previousInput: ITensor;

    constructor(input: ITensor) {
        super(input.shape);
        this.dependencies = [
            this.input = input,
            this.previousInput = new Tensor(input.shape)
        ];
        this.onPass = [
            copy(this, this.previousInput),
            copy(this.previousInput, this.input),
        ];
    }
}
