import quick_sort from '@code/QuickSort'

test('quick-sort', function () {
    const arr = [9, 3, 7, 4, 69, 420, 42]
    const arr2 = [7, 2, 3, 4, 5, 8, 20, 13, 11, 1, 5]

    quick_sort(arr)
    quick_sort(arr2)
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420])
    expect(arr2).toEqual([1, 2, 3, 4, 5, 5, 7, 8, 11, 13, 20])
})
