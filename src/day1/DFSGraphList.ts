const walk = (
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean => {
    if (seen[source]) return false;

    path.push(source);
    if (source === needle) return true;

    seen[source] = true;

    const edges = graph[source];
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (walk(graph, edge.to, needle, seen, path)) return true;
    }

    path.pop();

    return false;
};

const dfs = (
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null => {
    const path: number[] = [];
    const seen: boolean[] = new Array(graph.length).fill(false);

    walk(graph, source, needle, seen, path);

    if (path.length === 0) return null;

    return path;
};

export default dfs;
