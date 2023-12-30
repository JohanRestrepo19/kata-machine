const walk = (current: BinaryNode<number> | null, path: number[]): number[] => {
    if (!current) return path;

    path.push(current.value);
    walk(current.left, path);
    walk(current.right, path);
    return path;
};

const preOrderSearch = (head: BinaryNode<number>): number[] => {
    const path: number[] = [];
    return walk(head, path);
};

export default preOrderSearch;
