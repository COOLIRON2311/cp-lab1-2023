class Cache {
    #dat;
    #log;

    constructor(options = null) {
        this.#dat = new Map();
        this.#log = new Array();
        options?.forEach(element => {
            if (element.length === 3 && !Number.isInteger(element[2]))
                throw new Error(`invalid parameter '${element[2]}'`)
            if (element.length > 3)
                throw new Error(`invalid parameter '${element}'`);
            this.set(...element);
        });
    }

    set(key, value, n_queries = 1) {
        this.#dat.set(key, { value: value, queries: n_queries });
    }

    get(key) {
        const v = this.#dat.get(key);
        if (v === undefined || v.queries === 0) {
            this.#log.push(({
                key: key,
                value: null,
                queries: null
            }));
            return null;
        }
        else {
            this.#log.push(({
                key: key,
                value: v.value,
                queries: v.queries
            }));
            v.queries--;
            return v.value;
        }
    }

    stats() {
        return this.#log;
    }
}
export { Cache }
