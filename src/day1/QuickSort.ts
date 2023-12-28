const partition = (arr: number[], lo: number, hi: number): number => {
    const pivot = arr[hi]
    let idx = lo - 1
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++
            const temp = arr[i]
            arr[i] = arr[idx]
            arr[idx] = temp
        }
    }

    idx++
    arr[hi] = arr[idx]
    arr[idx] = pivot

    return idx
}

const recursive_qs = (arr: number[], lo: number, hi: number): void => {
    // Plantear el caso base que para la recursión
    if (lo >= hi) return

    //Plantear el caso recursivo
    const pivot = partition(arr, lo, hi)
    recursive_qs(arr, lo, pivot - 1)
    recursive_qs(arr, pivot + 1, hi)
}

const quick_sort = (arr: number[]): void => {
    recursive_qs(arr, 0, arr.length - 1)
}

export default quick_sort
