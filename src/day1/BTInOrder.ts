const walk = (current: BinaryNode<number> | null, path: number[]): number[] => {
    if (!current) return path;

    walk(current.left, path);
    path.push(current.value);
    walk(current.right, path);
    return path;
};

const inOrderSearch = (head: BinaryNode<number>): number[] => {
    const path: number[] = [];
    return walk(head, path);
};

export default inOrderSearch;
