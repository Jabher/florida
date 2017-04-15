//@flow
import type {InitValue, Shape, ITensor} from './types';
import {get, set, init, ndarray} from '../compute/_memory';

export class Tensor {
    dependencies: ITensor[] = [];
    shape: Shape;
    init: ?InitValue;
    onPass: Array<() => void> = [];
    isTensor: true;

    get(): Float32Array {
        return get(this);
    }

    set(value: Float32Array): void {
        set(this, ndarray(value, this.shape));
    }

    constructor(shape: Shape, init: ?InitValue) {
        Object.freeze(this.shape = [...shape]);
        this.init = init;
    }

    _initialized = false;

    initialize() {
        if (!this._initialized) {
            set(this, init(this.init, this.shape));
            this._initialized = true;
        }
    }
}

