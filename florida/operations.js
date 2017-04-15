//@flow
import * as R from 'ramda';
import type {InitValue, ITensor} from './tensors/types';
import {get, set} from './compute/_memory';
import {endNodesToList, dumpOps} from './utility/index';
import ndarray from 'ndarray';
import {Tensor} from './tensors/Tensor';
import {toZeros, add} from './compute/fns';

type Optimizer = (epoch: ITensor, counter: ITensor) => {
    dependencies: ITensor[],
    computeGradients: any[],
    applyGradients: any[]
}

type RunInit = {
    accepts: ITensor[],
    returns: ITensor[],
    values: InitValue[],
}

type OptimizeInit = {
    optimizers: Optimizer[],
    accepts: ITensor[],
    values: InitValue[][],
    epochs: number,
    verbose: number | boolean
};

function initTensors(tensors: ITensor[]): void {
    for (const tensor of tensors)
        tensor.initialize();
}


export function run({returns, accepts, values}: RunInit) {
    const tensorsUsed = endNodesToList(returns);
    initTensors(tensorsUsed);
    define(accepts, values);
    execute(dumpOps(tensorsUsed));
    return returns.map(get);
}

function define(accepts: ITensor[], values: InitValue[]) {
    for (const [tensor, data] of R.zip(accepts, values)) set(tensor, ndarray(data, tensor.shape));
}

function execute(ops) {
    for (const op of ops)
        op();
}


export function optimize({optimizers, accepts, values, epochs}: OptimizeInit) {
    let localEpoch = 1;
    const epoch = new Tensor([], new Float32Array([1]));
    const batchCounter = new Tensor([], new Float32Array([0]));
    const increment = new Tensor([], new Float32Array([1]));
    const optimizations = optimizers.map(optimizer => optimizer(epoch, batchCounter));
    const tensorsUsed = [
        ...endNodesToList(optimizations.reduce((acc, {dependencies}) => [...acc, ...dependencies], [])),
        epoch,
        batchCounter,
        increment,
    ];

    initTensors(tensorsUsed);

    const ops = [
        ...dumpOps(tensorsUsed),
        // batch learning will be actually implemented only
        // when concurrency will be available as it not helps in single-thread
        ...optimizations.reduce((acc, {computeGradients}) => [...acc, ...computeGradients], []),
        add(increment, batchCounter),
        ...optimizations.reduce((acc, {applyGradients}) => [...acc, ...applyGradients], []),
        toZeros(batchCounter)
    ];

    const afterEpoch = add(increment, epoch);

    while (localEpoch <= epochs) {
        for (const value of values) {
            define(accepts, value);
            execute(ops);
        }

        execute([
            afterEpoch
        ]);
        localEpoch += 1;
    }
}