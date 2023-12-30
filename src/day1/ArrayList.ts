export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private _array: T[];

    constructor(capacity?: number) {
        this.capacity = capacity || 3;
        this.length = 0;
        this._array = new Array(this.capacity).fill(undefined);
    }

    get array() {
        return this._array;
    }

    append(item: T): void {
        if (this.length >= this.capacity)
            throw new Error("Length has exceded capacity");

        this._array[this.length] = item;
        this.length++;
    }

    get(idx: number): T | undefined {
        if (idx >= this.capacity) return undefined;
        return this._array[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.capacity) return undefined;
        const value = this.array[idx];
        for (let i = idx; i <= this.length; i++)
            this.array[i] = this.array[i + 1];
        this.length--;
        return value;
    }

    remove(item: T): T | undefined {
        let removedItemIndex: number | undefined = undefined;

        for (let i = 0; i < this.length; i++) {
            if (this.array[i] === item) {
                removedItemIndex = i;
                break;
            }
        }

        if (removedItemIndex !== undefined)
            return this.removeAt(removedItemIndex);

        return undefined;
    }

    prepend(item: T): void {
        if (this.length >= this.capacity) return;
        this.length++;
        for (let i = this.length - 1; i > 0; i--)
            this.array[i] = this.array[i - 1];
        this.array[0] = item;
    }

    insertAt(item: T, idx: number): void {
        if (idx >= this.capacity)
            throw new Error("Length has exceded capacity");

        this.length++;

        for (let i = this.length; i > idx; i--)
            this._array[i] = this._array[i - 1];

        this._array[idx] = item;
    }
}
