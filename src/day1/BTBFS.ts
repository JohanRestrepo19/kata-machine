import Queue from "./Queue";

const bfs = (head: BinaryNode<number>, needle: number): boolean => {
  const queue = new Queue<BinaryNode<number>>();
  queue.enqueue(head);

  while (queue.length) {
    const current = queue.deque();

    if (needle === current?.value) return true;

    if (current?.left) queue.enqueue(current.left);
    if (current?.right) queue.enqueue(current.right);
  }

  return false;
};

export default bfs;
