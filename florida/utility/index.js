//@flow
import type {ITensor} from '../tensors/types';
import {toposort} from './toposort';

export function endNodesToList<T: ITensor>(nodes: T[]): T[] {
    return subgraphToList(nodes, tensor => tensor.dependencies);
}

export function subgraphToList<T>(nodes: T[], getChildren: (n: T) => T[]): T[] {
    const alreadyDiscoveredNodes = new Set(nodes);
    alreadyDiscoveredNodes.forEach(node => getChildren(node).forEach(child => alreadyDiscoveredNodes.add(child)));
    return Array.from(alreadyDiscoveredNodes);
}


export function dumpOps(tensorsUsed: ITensor[]) {
    const dependencies = tensorsUsed
        .map(tensor => tensor.dependencies.map(dep => [dep, tensor]))
        .reduce((acc, deps) => [...acc, ...deps], []);

    return toposort(tensorsUsed, dependencies)
        .map(node => node.onPass.map(fn => Object.assign(fn, {tensor: node})))
        .reduce((a, b) => a.concat(b), []);
}
