//@flow
import ndarray from 'ndarray';
import type {InitValue, Shape} from './types';

export class Tensor {
    dependencies: Tensor[] = [];
    shape: Shape;
    init: InitValue;
    onPass: Array<() => void> = [];
    afterPass: Array<() => void> = [];

    constructor(shape: Shape) {
        this.shape = Object.freeze([...shape]);
    }

    //$FlowFixMe
    get name(): string {
        return this.constructor.name;
    }

    bootstrap(init: any = this.init) {
        if (init === undefined)
            throw new Error();
        if (typeof init === 'number')
            init = [init];
        if (Array.isArray(init))
            init = new Float32Array(init);

        return ndarray(init, this.shape);
    };
}
