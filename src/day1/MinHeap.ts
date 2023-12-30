export default class MinHeap {
    public length: number;
    private heap: number[];

    constructor() {
        this.length = 0;
        this.heap = [];
    }

    insert(value: number): void {
        if (this.length === 0) {
            this.heap[0] = value;
            this.length++;
            return;
        }

        this.length++;
        this.heap[this.length - 1] = value;
        this.heapifyUp(this.length - 1);
    }

    delete(): number | undefined {
        if (this.length === 0) return undefined;

        const out = this.heap[0];

        if (this.length === 1) {
            this.heap = [];
            this.length--;
            return out;
        }

        this.heap[0] = this.heap[this.length - 1];
        this.length--;
        this.heapifyDown(0);
        return out;
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

    private heapifyUp(idx: number): void {
        if (idx === 0) return;

        const parentIdx = this.parent(idx);
        const value = this.heap[idx];
        const parentValue = this.heap[parentIdx];

        if (value < parentValue) {
            this.heap[parentIdx] = value;
            this.heap[idx] = parentValue;
            this.heapifyUp(parentIdx);
        }
    }

    private heapifyDown(idx: number): void {
        if (idx === this.length - 1) return;

        const value = this.heap[idx];
        const leftChildIdx = this.leftChild(idx);
        const rightChildIdx = this.rightChild(idx);
        const leftChildValue = this.heap[leftChildIdx];
        const rightChildValue = this.heap[rightChildIdx];

        let minChildIdx: number;

        if (leftChildValue < rightChildValue) minChildIdx = leftChildIdx;
        else minChildIdx = rightChildIdx;

        if (value > this.heap[minChildIdx]) {
            this.heap[idx] = this.heap[minChildIdx];
            this.heap[minChildIdx] = value;
            this.heapifyDown(minChildIdx);
        }
    }
}
