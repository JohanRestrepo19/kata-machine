const walk = (current: BinaryNode<number> | null, path: number[]): number[] => {
  if (!current) return path;


  // recursion
  // pre recursion
  path.push(current.value);
  // recurse
  walk(current.left, path);
  walk(current.right, path);
  // post recursion
  return path;
};

const preOrderSearch = (head: BinaryNode<number>): number[] => {
  const path: number[] = [];
  return walk(head, path);
};

export default preOrderSearch;
