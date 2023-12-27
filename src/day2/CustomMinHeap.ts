type HeapElement = {
  id: number;
  priority: number;
};

export default class MinHeap<T extends HeapElement> {
  public length: number;
  private data: T[];

  constructor() {
    this.length = 0;
    this.data = [];
  }

  insert(element: T): void {
    if (this.length === 0) {
      this.data[0] = element;
      this.length++;
      return;
    }

    this.length++;
    this.data[this.length - 1] = element;
    this.heapifyUp(this.length - 1);
  }

  delete(): T["id"] | undefined {
    if (this.length === 0) return;

    const out = this.data[0];

    if (this.length === 1) {
      this.length = 0;
      this.data = [];
      return out.id;
    }

    this.data[0] = this.data[this.length - 1];
    this.data.splice(this.length - 1, 1);
    this.length--;
    this.heapifyDown(0);
    return out.id;
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return 2 * idx + 1;
  }

  private rightChild(idx: number): number {
    return 2 * idx + 2;
  }

  private heapifyUp(idx: number) {
    if (idx === 0) return;

    const parentIdx = this.parent(idx);
    const element = this.data[idx];
    const parentElement = this.data[parentIdx];

    if (element.priority < parentElement.priority) {
      this.data[parentIdx] = element;
      this.data[idx] = parentElement;
      this.heapifyUp(parentIdx);
    }
  }

  private getMinChild(idx: number): number | undefined {
    const lChildIdx = this.leftChild(idx);
    const rChildIdx = this.rightChild(idx);
    const lChildElement = this.data[lChildIdx];
    const rChildElement = this.data[rChildIdx];

    if (lChildElement && rChildElement) {
      if (lChildElement.priority < rChildElement.priority) return lChildIdx;
      else return rChildIdx;
    }

    if (lChildElement && !rChildElement) return lChildIdx;

    return undefined;
  }

  private heapifyDown(idx: number) {
    const element = this.data[idx];
    const minChildIdx = this.getMinChild(idx);
    if (idx === this.length - 1) return;

    if (!minChildIdx) return;

    const minChildElement = this.data[minChildIdx];

    if (element.priority > minChildElement.priority) {
      this.data[idx] = minChildElement;
      this.data[minChildIdx] = element;
      this.heapifyDown(minChildIdx);
    }
  }
}
