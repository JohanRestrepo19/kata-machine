import MinHeap from "@code/CustomMinHeap";

const dijkstra_list = (
    source: number,
    sink: number,
    graph: WeightedAdjacencyList,
): number[] => {
    const prev: number[] = new Array(graph.length).fill(-1);
    const minHeap = new MinHeap<{ id: number; priority: number }>();

    for (let i = 0; i < graph.length; i++)
        minHeap.insert({ id: i, priority: Infinity });

    minHeap.update(source, 0);

    while (minHeap.length > 0) {
        const currentVertex = minHeap.delete() as HeapElement;
        const edges = graph[currentVertex.id as number];


        for (const edge of edges) {
            const nextVertex = minHeap.getElement(edge.to);
            if(!nextVertex) continue

            const possibleNextVertDist = currentVertex.priority + edge.weight;

            if (possibleNextVertDist < nextVertex.priority) {
                prev[edge.to] = currentVertex.id as number;
                minHeap.update(nextVertex.id as number, possibleNextVertDist);
            }
        }
    }

    const out: number[] = [];
    let current = sink;

    while (prev[current] !== -1) {
        out.push(prev[current]);
        current = prev[current];
    }

    out.reverse();
    out.push(sink);

    return out;
};

export default dijkstra_list;
