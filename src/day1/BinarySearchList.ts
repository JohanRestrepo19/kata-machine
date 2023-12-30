const bs_list = (haystack: number[], needle: number): boolean => {
    let lo = 0;
    let hi = haystack.length;

    while (lo < hi) {
        const m = Math.floor((hi - lo) / 2 + lo);
        const v = haystack[m];

        if (needle === v) return true;
        else if (needle > v) lo = m + 1;
        else hi = m;
    }

    return false;
};

export default bs_list;
