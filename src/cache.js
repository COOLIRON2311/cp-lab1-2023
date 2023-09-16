class Cache {
    constructor() {
        this._dat = new Map();
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
        return this._dat.set(key, value);
    }

    get(key) {
        const v = this._dat.get(key);
        if (v === undefined)
            return null;
        else
            return v;
    }
}
export { Cache }
