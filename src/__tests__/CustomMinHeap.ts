import MinHeap from "@code/CustomMinHeap";

describe("MinHeap", () => {
    test("Prime's Test", function() {
        const heap = new MinHeap();

        expect(heap.length).toEqual(0);

        heap.insert({ priority: 5, id: 0 });
        heap.insert({ priority: 3, id: 1 });
        heap.insert({ priority: 69, id: 2 });
        heap.insert({ priority: 420, id: 3 });
        heap.insert({ priority: 4, id: 4 });
        heap.insert({ priority: 1, id: 5 });
        heap.insert({ priority: 8, id: 6 });
        heap.insert({ priority: 7, id: 7 });

        expect(heap.length).toEqual(8);
        expect(heap.delete()).toEqual(5);
        expect(heap.delete()).toEqual(1);
        expect(heap.delete()).toEqual(4);
        expect(heap.delete()).toEqual(0);
        expect(heap.length).toEqual(4);
        expect(heap.delete()).toEqual(7);
        expect(heap.delete()).toEqual(6);
        expect(heap.delete()).toEqual(2);
        expect(heap.delete()).toEqual(3);
        expect(heap.length).toEqual(0);
    });

    test("Insert and delete single element", () => {
        const heap = new MinHeap();
        heap.insert({ priority: 5, id: 0 });
        expect(heap.length).toEqual(1);
        expect(heap.delete()).toEqual(0);
        expect(heap.length).toEqual(0);
    });

    test("Insert and delete multiple elements", () => {
        const heap = new MinHeap();
        heap.insert({ priority: 5, id: 0 });
        heap.insert({ priority: 3, id: 1 });
        heap.insert({ priority: 69, id: 2 });
        heap.insert({ priority: 420, id: 3 });
        heap.insert({ priority: 4, id: 4 });

        expect(heap.length).toEqual(5);
        expect(heap.delete()).toEqual(1);
        expect(heap.delete()).toEqual(4);
        expect(heap.length).toEqual(3);
        expect(heap.delete()).toEqual(0);
        expect(heap.delete()).toEqual(2);
        expect(heap.delete()).toEqual(3);
        expect(heap.length).toEqual(0);
    });

    test("Heap maintains min-heap property", () => {
        const heap = new MinHeap();
        heap.insert({ priority: 5, id: 0 });
        heap.insert({ priority: 3, id: 1 });
        heap.insert({ priority: 69, id: 2 });
        heap.insert({ priority: 420, id: 3 });
        heap.insert({ priority: 4, id: 4 });

        expect(heap.length).toEqual(5);
        expect(heap.delete()).toEqual(1);
        expect(heap.delete()).toEqual(4);

        // Insert some elements and verify min-heap property
        heap.insert({ priority: 1, id: 5 });
        heap.insert({ priority: 7, id: 6 });
        heap.insert({ priority: 8, id: 7 });

        expect(heap.length).toEqual(6);
        expect(heap.delete()).toEqual(5);
        expect(heap.delete()).toEqual(0);
        expect(heap.delete()).toEqual(6);
        expect(heap.delete()).toEqual(7);
        expect(heap.delete()).toEqual(2);
        expect(heap.length).toEqual(1);
    });

    test("Insertion and lookup", () => {
        const heap = new MinHeap();
        heap.insert({ priority: 5, id: 0 });
        heap.insert({ priority: 3, id: 1 });
        heap.insert({ priority: 69, id: 2 });

        expect(heap.lookUpId(0)).toEqual(1);
        expect(heap.lookUpId(1)).toEqual(0);
        expect(heap.lookUpId(2)).toEqual(2);
    });

    test("Update and lookup", () => {
        const heap = new MinHeap();

        heap.insert({ priority: 5, id: "A" });
        heap.insert({ priority: 3, id: "B" });
        heap.insert({ priority: 69, id: "C" });
        heap.insert({ priority: 420, id: "D" });
        heap.insert({ priority: 4, id: "E" });

        heap.update("D", 2); //In this case the heap must to heapifyUp
        expect(heap.lookUpId("D")).toEqual(0);

        heap.update("C", 6); //In this case the heap only needs to update the value
        expect(heap.lookUpId("C")).toEqual(2);

        heap.update("D", 420); // In this case the heap must to heapifyDown
        expect(heap.lookUpId("D")).toEqual(3);
    });

    test("Deletion and lookup", () => {
        const heap = new MinHeap();
        heap.insert({ priority: 5, id: "A" });
        heap.insert({ priority: 3, id: "B" });
        heap.insert({ priority: 69, id: "C" });

        heap.delete();

        expect(heap.lookUpId("B")).toBeUndefined();
        expect(heap.lookUpId("A")).toEqual(0);
        expect(heap.lookUpId("C")).toEqual(1);
    });
});
