//@flow
export type InitValue = Float32Array | number | number[] | {[key: string]: any};
export type Shape = [] | [number] | [number, number] | [number, number, number] | [number, number, number, number];

export interface ITensor {
    dependencies: ITensor[];
    shape: Shape;
    init: ?InitValue;
    initialize(): void;
    onPass:  Array<() => void>;
}