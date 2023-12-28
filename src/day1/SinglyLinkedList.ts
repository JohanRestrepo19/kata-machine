export default class SinglyLinkedList<T> {
    public length: number
    private head: ListNode<T>
    private tail: ListNode<T>

    constructor() {
        this.length = 0
    }

    append(item: T): void {
        const newNode: ListNode<T> = { value: item }

        if (this.length === 0) this.head = this.tail = newNode

        this.tail.next = newNode
        this.tail = newNode
        this.length += 1
    }

    prepend(item: T): void {
        const newNode: ListNode<T> = { value: item }
        if (this.length === 0) this.head = this.tail = newNode

        newNode.next = this.head
        this.head = newNode
        this.length += 1
    }

    insertAt(item: T, idx: number): void {
        if (idx >= this.length) {
            this.append(item)
            return
        }
        const newNode: ListNode<T> = { value: item }

        let currentNode = this.head
        for (let i = 0; i < idx; i++)
            if (currentNode.next) currentNode = currentNode.next

        newNode.next = currentNode.next
        currentNode.next = newNode
    }

    remove(item: T): T | undefined {
        if (this.length === 0) return
        let currentPrevNode: ListNode<T> | undefined
        let currentNode: ListNode<T> | undefined = this.head

        while (currentNode) {
            if (currentNode.value === item) {
                this.length -= 1
                if (currentNode === this.head && this.head.next) {
                    this.head = this.head.next
                    return currentNode.value
                } else if (currentNode === this.tail && currentPrevNode) {
                    this.tail = currentPrevNode
                    return currentNode.value
                } else {
                    if (currentPrevNode) currentPrevNode.next = currentNode.next
                    return currentNode.value
                }
            }

            currentPrevNode = currentNode
            currentNode = currentNode.next
        }
        return
    }

    get(idx: number): T | undefined {
        if (idx > this.length - 1) return
        let currentNode: ListNode<T> | undefined = this.head
        for (let i = 0; i < idx; i++) currentNode = currentNode?.next
        return currentNode?.value
    }

    removeAt(idx: number): T | undefined {
        if (idx > this.length - 1) return
        let currentPrevNode: ListNode<T> | undefined
        let currentNode: ListNode<T> | undefined = this.head

        for (let i = 0; i < idx; i++) {
            currentPrevNode = currentNode
            currentNode = currentNode?.next
        }

        this.length -= 1
        if (currentNode === this.head) {
            if (this.head.next) this.head = this.head.next
            return currentNode.value
        }

        if (currentNode === this.tail) {
            if (currentPrevNode) {
                this.tail = currentPrevNode
                this.tail.next = undefined
            }
            return currentNode.value
        }

        if (currentPrevNode) currentPrevNode.next = currentNode?.next

        return currentNode?.value
    }
}
