export default class DoublyLinkedList<T> {
  public length: number;
  private head?: ListNode<T>;
  private tail?: ListNode<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  prepend(item: T): void {
    this.length++;
    const node: ListNode<T> = { value: item };

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error(
        `The idx: ${idx} is greater than current length: ${this.length}`,
      );
    } else if (idx === 0) {
      this.prepend(item);
    } else if (idx === this.length) {
      this.append(item);
    }

    this.length++;
    const node: ListNode<T> = { value: item };
    const current = this.getAt(idx);

    node.prev = current?.prev;
    node.next = current;

    if (current?.prev) {
      current.prev.next = node;
      current.prev = node;
    }
  }

  append(item: T): void {
    this.length++;
    const node: ListNode<T> = { value: item };

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  remove(item: T): T | undefined {
    let current = this.head;
    for (let i = 0; current && i < this.length; i++) {
      if (current.value === item) break;
      current = current.next;
    }

    if (!current) return;

    return this.removeNode(current);
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  removeAt(idx: number): T | undefined {
    const current = this.getAt(idx);
    if (!current) return;

    return this.removeNode(current);
  }

  private getAt(idx: number): ListNode<T> | undefined {
    if (idx > this.length) return;

    let current = this.head;
    for (let i = 0; current && i < idx; i++) current = current.next;

    return current;
  }

  private removeNode(node: ListNode<T>): T {
    this.length--;
    const value = node.value;

    if (this.length === 0) {
      this.head = this.tail = undefined;
    } else if (node === this.head) {
      this.head = this.head.next;
    } else if (node === this.tail) {
      this.tail = this.tail.prev;
    } else {
      if (node.prev) node.prev.next = node.next;
      if (node.next) node.next.prev = node.prev;
    }

    return value;
  }
}
