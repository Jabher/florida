//@flow
import * as R from 'ramda';
import type {InitValue} from './Tensor';
import {Placeholder, Tensor} from './Tensor';
import {toposort} from './toposort';
import {get, set} from './memory';

type Optimizer = {
    args: Tensor[],
    run: (epoch: number) => void
};

type RunInit = {
    accepts: Placeholder[],
    returns: Tensor[],
    values: InitValue[][],
}

type OptimizeInit = {
    optimizers: Optimizer[],
    accepts: Placeholder[],
    values: InitValue[][],
    epochs: number,
    verbose: number | boolean
};

function subgraphToList<T>(nodes: T[], getChildren: (n: T) => T[]): T[] {
    const alreadyDiscoveredNodes = new Set(nodes);
    alreadyDiscoveredNodes.forEach(node => getChildren(node).forEach(child => alreadyDiscoveredNodes.add(child)));
    return Array.from(alreadyDiscoveredNodes);
}

function outputsToFn(outputs: Tensor[]) {
    const tensorsUsed = subgraphToList(outputs, tensor => tensor.dependencies);
    const dependencies = tensorsUsed
        .map(tensor => tensor.dependencies.map(dep => [dep, tensor]))
        .reduce((acc, deps) => [...acc, ...deps], []);
    const sortedTensors = toposort(tensorsUsed, dependencies);
    const ops: Array<() => void> = sortedTensors //$FlowFixMe
        .filter(tensor => tensor.computation instanceof Function) //$FlowFixMe
        .map(tensor => tensor.computation);
    const run = op => op();
    return () => ops.forEach(run);
}

export function run({returns, accepts, values}: RunInit) {
    for (const [tensor, data] of R.zip(accepts, values)) set(tensor, tensor.bootstrap(data));
    outputsToFn(returns)();
    return returns.map(get);
}


export function optimize({optimizers, accepts, values, epochs, verbose}: OptimizeInit) {
    if (verbose === true)
        verbose = 1;
    if (verbose === false)
        verbose = Infinity;
    const finalTensors = optimizers.map(({args}) => args).reduce((a, b) => a.concat(b), []);
    const fn = outputsToFn(finalTensors);

    let epoch = 1;
    while (epoch <= epochs) {
        if (epoch % verbose === 0)
            console.log(epoch);
        for (const valueSet of values) {
            for (const [tensor, data] of R.zip(accepts, valueSet)) set(tensor, tensor.bootstrap(data));
            fn();
            for (const {run} of optimizers) run(epoch);
        }
        epoch++;
    }
}