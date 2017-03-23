//@flow
import ndarray from 'ndarray';
export type Shape = [] | [number] | [number, number] | [number, number, number] | [number, number, number, number];

export type InitValue = Float32Array | number | number[] | any;

export class Tensor {
    dependencies: Tensor[] = [];
    shape: Shape;
    init: InitValue;

    constructor(shape: Shape) {
        this.shape = Object.freeze([...shape]);
    }

    bootstrap(init: any = this.init) {
        if (!init)
            throw new Error();
        if (typeof init === 'number')
            init = [init];
        if (Array.isArray(init))
            init = new Float32Array(init);

        return ndarray(init, this.shape);
    };
}

export class Value extends Tensor {
    constructor(shape: Shape, init: InitValue) {
        super(shape);
        this.init = init;
    }
}

export class Placeholder extends Tensor {}

