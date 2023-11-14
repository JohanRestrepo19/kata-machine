type Node<T> = {
  value: T;
  prev?: Node<T>;
};

export default class Stack<T> {
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: T): void {
    const newNode: Node<T> = { value: item };
    this.length++;
    if (!this.head) {
      this.head = newNode;
      return;
    }

    newNode.prev = this.head;
    this.head = newNode;
  }

  pop(): T | undefined {
    if (!this.head) return undefined;

    this.length--;
    const head = this.head;
    this.head = this.head.prev;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
