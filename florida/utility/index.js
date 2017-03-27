//@flow
import {Tensor} from '../tensors/Tensor';
import {toposort} from './toposort';

export function endNodesToList<T: Tensor>(nodes: T[]): T[] {
    return subgraphToList(nodes, tensor => tensor.dependencies);
}

export function subgraphToList<T>(nodes: T[], getChildren: (n: T) => T[]): T[] {
    const alreadyDiscoveredNodes = new Set(nodes);
    alreadyDiscoveredNodes.forEach(node => getChildren(node).forEach(child => alreadyDiscoveredNodes.add(child)));
    return Array.from(alreadyDiscoveredNodes);
}

export function afterPassFns(tensorsUsed: Tensor[]) {
    return tensorsUsed
        .map(node => node.afterPass)
        .reduce((a, b) => a.concat(b), []);
}

export function onPassFns(tensorsUsed: Tensor[]) {
    const dependencies = tensorsUsed
        .map(tensor => tensor.dependencies.map(dep => [dep, tensor]))
        .reduce((acc, deps) => [...acc, ...deps], []);

    return toposort(tensorsUsed, dependencies)
        .map(node => node.onPass)
        .reduce((a, b) => a.concat(b), []);
}
