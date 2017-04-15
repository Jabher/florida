//@flow
import type {ITensor} from './tensors/types';
import {axpy} from './compute/fns';
import {Tensor} from './tensors/Tensor';

export function sgd(weights: ITensor, deltas: ITensor, {learningRate}: {learningRate: number}) {
    const LR = new Tensor([], new Float32Array([learningRate]));
    return (epoch: ITensor, counter: ITensor) => {
        const store = new Tensor(weights.shape);
        return {
            dependencies: [
                weights,
                deltas,
                epoch,
                store,
                LR,
                counter
            ],
            computeGradients: [axpy(LR, deltas, store)],
            applyGradients: [axpy(counter, deltas, weights)]
        }
    }
}