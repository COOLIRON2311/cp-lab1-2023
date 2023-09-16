class Cache {
    #dat;

    constructor() {
        this.#dat = new Map();
        // return new Proxy(this, {
        //     // get: (obj, key) => {
        //     //     const v = obj._dat.get(key);
        //     //     if (v === undefined)
        //     //         return null;
        //     //     else
        //     //         return v;
        //     // },
        //     set: (obj, key, value) => { return obj._dat.set(key, value) }
        // })
    }

    set(key, value, n_queries = 1) {
        this.#dat.set(key, {value: value, queries: n_queries});
    }

    get(key) {
        const v = this.#dat.get(key);
        if (v === undefined || v.queries === 0)
            return null;
        else
        {
            v.queries--;
            return v.value;
        }
    }
}
export { Cache }
