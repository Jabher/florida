//@flow
import * as R from 'ramda';
import {Tensor} from './Tensor';
import {axpy} from './blas/level1';
import {get} from './memory';

export function sgd(weights: Tensor, deltas: Tensor[], {learningRate}: { learningRate: number }) {
    const deltasCount = deltas.length;
    const resultingCoefficient = learningRate * (1 / deltasCount);
    const applyDeltas = R.forEach((delta: Tensor) => {
        axpy(resultingCoefficient, get(delta), get(weights));
    });
    return {
        args: deltas,
        run: (epoch: number) => applyDeltas(deltas)
    };
}