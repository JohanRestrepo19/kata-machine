const createNode = <V>(value: V): ListNode<V> => {
    return { value };
};

export default class LRU<K, V> {
    private length: number;
    private capacity: number;
    private head?: ListNode<V>;
    private tail?: ListNode<V>;
    private lookup: Map<K, ListNode<V>>;
    private reverseLookup: Map<ListNode<V>, K>;

    constructor(capacity: number = 10) {
        this.capacity = capacity;
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map();
        this.reverseLookup = new Map();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.prepend(node);
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
            this.length++;
            this.trimCache();
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (node === undefined) return node;

        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    private detach(node: ListNode<V>): void {
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;

        if (node === this.head) this.head = this.head.next;
        if (node === this.tail) this.tail = this.tail.prev;

        node.prev = node.next = undefined;
    }

    private prepend(node: ListNode<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) return;

        const tail = this.tail as ListNode<V>;
        const key = this.reverseLookup.get(tail) as K;

        this.detach(this.tail as ListNode<V>);

        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}
