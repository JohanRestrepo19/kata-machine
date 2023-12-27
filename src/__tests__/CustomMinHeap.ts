import MinHeap from "@code/CustomMinHeap";

describe("MinHeap", () => {
  test("Prime's Test", function () {
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

  test("insert and delete single element", () => {
    const heap = new MinHeap();
    heap.insert({ priority: 5, id: 0 });
    expect(heap.length).toEqual(1);
    expect(heap.delete()).toEqual(0);
    expect(heap.length).toEqual(0);
  });

  test("insert and delete multiple elements", () => {
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

  test("heap maintains min-heap property", () => {
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
});
