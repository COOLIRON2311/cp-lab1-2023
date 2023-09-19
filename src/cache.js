class Cache {
    #dat;

    constructor(options = null) {
        this.#dat = new Map();
        options?.forEach(element => {
            if (element.length > 3)
                throw new Error(`invalid parameter {${element}}`);
            this.set(...element);
        });
    }

    set(key, value, n_queries = 1) {
        this.#dat.set(key, { value: value, queries: n_queries });
    }

    get(key) {
        const v = this.#dat.get(key);
        if (v === undefined || v.queries === 0)
            return null;
        else {
            v.queries--;
            return v.value;
        }
    }

    stats() {
        // return Array.from(this.#dat.entries()).map(([k, v]) => ({
        return [...this.#dat.entries()].map(([k, v]) => ({
            key: k,
            value: v.value,
            queries: v.queries
        }));
    }
}
export { Cache }
