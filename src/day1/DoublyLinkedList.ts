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

    let current = this.head;
    for (let i = 0; i < idx; i++) current = current?.next;

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

    while (current) {
      if (current.value === item) {
        this.length--;
        const value = current.value;

        if (current === this.head) {
          this.head = this.head.next;
        } else if (current === this.tail) {
          this.tail = this.tail.prev;
        } else {
          if (current.prev) current.prev.next = current.next;
          if (current.next) current.next.prev = current.prev;
        }

        return value;
      }
      current = current.next;
    }

    return;
  }

  get(idx: number): T | undefined {
    if (idx > this.length) return;

    let current = this.head;
    for (let i = 0; i < idx; i++) current = current?.next;

    return current?.value;
  }

  removeAt(idx: number): T | undefined {
    if (idx > this.length) return;

    let current = this.head;
    for (let i = 0; i < idx; i++) current = current?.next;

    this.length--;
    const value = current?.value;
    if (current === this.head) {
      this.head = this.head?.next;
    } else if (current === this.tail) {
      this.tail = this.tail?.prev;
    } else {
      if (current?.prev) current.prev.next = current.next;
      if (current?.next) current.next.prev = current.prev;
    }

    return value;
  }
}
