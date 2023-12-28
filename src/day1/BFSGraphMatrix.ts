import Queue from './Queue'

const bfs = (
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null => {
    const path: number[] = []
    const prev: number[] = new Array(graph.length).fill(-1)
    const queue = new Queue<number>()
    const seen: boolean[] = new Array(graph.length).fill(false)

    queue.enqueue(source)

    while (queue.length > 0) {
        const current = queue.deque() as number
        seen[current] = true

        if (current === needle) break

        const adjs = graph[current]
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0 || seen[i]) continue

            prev[i] = current
            queue.enqueue(i)
        }
    }

    if (prev[needle] === -1) return null

    let currentVertex = needle

    while (prev[currentVertex] !== -1) {
        path.push(prev[currentVertex])
        currentVertex = prev[currentVertex]
    }

    path.reverse()
    return path.concat(needle)
}

export default bfs
