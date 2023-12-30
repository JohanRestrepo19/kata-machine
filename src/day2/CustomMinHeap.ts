type HeapElement = {
    id: number | string;
    priority: number;
};

export default class MinHeap<T extends HeapElement> {
    public length: number;
    private data: T[];
    private lookUp: Map<T["id"], number>;

    constructor() {
        this.length = 0;
        this.data = [];
        this.lookUp = new Map();
    }

    get innerLookUp() {
        return this.lookUp;
    }

    insert(element: T) {
        if (this.length === 0) {
            this.data[0] = element;
            this.length++;
            this.lookUp.set(element.id, 0);
            return;
        }

        this.length++;
        this.data[this.length - 1] = element;
        this.lookUp.set(element.id, this.length - 1);
        this.heapifyUp(this.length - 1);
    }

    update(id: T["id"], priority: number) {
        const elementIdx = this.lookUp.get(id);

        if (elementIdx === undefined) return;

        const element = this.data[elementIdx];
        const prevPriority = element.priority;
        element.priority = priority;

        if (element.priority < prevPriority) this.heapifyUp(elementIdx);
        if (element.priority > prevPriority) this.heapifyDown(elementIdx);
    }

    delete(): T["id"] | undefined {
        if (this.length === 0) return;

        const out = this.data[0];
        this.lookUp.delete(out.id);

        if (this.length === 1) {
            this.length = 0;
            this.data = [];
            return out.id;
        }

        this.data[0] = this.data[this.length - 1];
        this.lookUp.set(this.data[0].id, 0);
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

    private getMinChild(idx: number): number | undefined {
        const lChildIdx = this.leftChild(idx);
        const rChildIdx = this.rightChild(idx);
        const lChildElement = this.data[lChildIdx];
        const rChildElement = this.data[rChildIdx];

        if (lChildElement && rChildElement) {
            if (lChildElement.priority < rChildElement.priority)
                return lChildIdx;
            else return rChildIdx;
        }

        if (lChildElement && !rChildElement) return lChildIdx;

        return undefined;
    }

    private swapElements(idx1: number, idx2: number) {
        const el1 = this.data[idx1];
        const el2 = this.data[idx2];
        const lookUp1 = this.lookUp.get(el1.id) as number;
        const lookUp2 = this.lookUp.get(el2.id) as number;

        this.data[idx1] = el2;
        this.data[idx2] = el1;
        this.lookUp.set(el1.id, lookUp2);
        this.lookUp.set(el2.id, lookUp1);
    }

    private heapifyUp(idx: number): number {
        let currentIdx = idx;

        while (currentIdx > 0) {
            const parentIdx = this.parent(currentIdx);
            const element = this.data[currentIdx];
            const parentElement = this.data[parentIdx];

            if (element.priority < parentElement.priority) {
                this.swapElements(currentIdx, parentIdx);
                currentIdx = parentIdx;
            } else break;
        }
        return currentIdx;
    }

    private heapifyDown(idx: number): number {
        let currentIdx: number = idx;

        while (currentIdx < this.length) {
            const element = this.data[currentIdx];
            const minChildIdx = this.getMinChild(currentIdx);

            if (!minChildIdx) break;

            const minChildElement = this.data[minChildIdx];

            if (element.priority > minChildElement.priority) {
                this.swapElements(currentIdx, minChildIdx);
                currentIdx = minChildIdx;
            } else break;
        }

        return currentIdx;
    }
}
