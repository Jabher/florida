//@flow
export function toposort<T>(nodes: T[], edges: [T, T][]): T[] {
    let cursor = nodes.length;
    let i = cursor;
    const sorted = [];
    const visited = {};


    while (i--) {
        if (!visited[i]) visit(nodes[i], i, [])
    }

    return sorted;

    function visit(node, i, predecessors) {
        if (predecessors.indexOf(node) >= 0) {
            throw new Error('Cyclic dependency: ' + JSON.stringify(node))
        }

        if (!nodes.includes(node)) {
            throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: ' + JSON.stringify(node))
        }

        if (visited[i])
            return;
        visited[i] = true;

        // outgoing edges
        const outgoing = edges.filter((edge) => edge[0] === node);

        if (i = outgoing.length) {
            const preds = predecessors.concat(node);
            do {
                const child = outgoing[--i][1];
                visit(child, nodes.indexOf(child), preds)
            } while (i)
        }

        sorted[--cursor] = node
    }
}