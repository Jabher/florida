//@flow
import * as R from 'ramda';
import type {InitValue} from './tensors/types';
import {Placeholder, Tensor} from './tensors';
import {get, set} from './memory';
import {afterPassFns, endNodesToList, onPassFns} from './utility/index';

type Optimizer = {
    args: Tensor[],
    run: (epoch: number) => void
};

type RunInit = {
    accepts: Placeholder[],
    returns: Tensor[],
    values: InitValue[],
}

type OptimizeInit = {
    mutations: Optimizer[],
    accepts: Placeholder[],
    values: InitValue[][],
    epochs: number,
    verbose: number | boolean
};

export function run({returns, accepts, values}: RunInit) {
    executeDefine(accepts, values);
    const tensorsUsed = endNodesToList(returns);
    executeRun(onPassFns(tensorsUsed));
    const result = returns.map(get);
    executeRun(afterPassFns(tensorsUsed));
    return result;
}

function executeDefine(accepts: Tensor[], values: InitValue[]) {
    for (const [tensor, data] of R.zip(accepts, values)) set(tensor, tensor.bootstrap(data));
}

function executeRun(ops) { for (const op of ops) op(); }

function executeOptimizeEpoch(currentEpoch, accepts, values, onPassOps, afterPassOps, optimizers) {
    for (let i = 0; i < values.length; i++) {
        executeDefine(accepts, values[i]);
        executeRun(onPassOps);
        executeMutations(currentEpoch, optimizers);
        executeRun(afterPassOps);
    }
}

function executeMutations(currentEpoch, mutations) {
    for (const {run} of mutations)
        run(currentEpoch);
}

export function optimize({mutations, accepts, values, epochs}: OptimizeInit) {
    const tensorsUsed = endNodesToList(mutations.map(({args}) => args).reduce((a, b) => a.concat(b), []));

    const onPassOps = onPassFns(tensorsUsed);
    const afterPassOps = afterPassFns(tensorsUsed);

    resetMemoryCells(tensorsUsed);

    let epoch = 1;

    while (epoch <= epochs) {
        executeOptimizeEpoch(epoch, accepts, values, onPassOps, afterPassOps, mutations);
        epoch++;
    }
}

export function resetMemoryCells(cells: Tensor[]) {
    for (const cell of cells)
        if (cell.resettable)
            set(cell, cell.bootstrap());
}