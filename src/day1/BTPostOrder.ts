const walk = (current: BinaryNode<number> | null, path: number[]): number[] => {
    if (!current) return path;

    walk(current.left, path);
    walk(current.right, path);
    path.push(current.value);
    return path;
};

const postOrderSearch = (head: BinaryNode<number>): number[] => {
    const path: number[] = [];
    return walk(head, path);
};

export default postOrderSearch;
