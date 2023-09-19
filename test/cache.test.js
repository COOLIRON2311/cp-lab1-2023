import { Cache } from "../src/cache";

describe('basic set/get tests', () => {
    const k = 'test';
    const v = 1;

    it('should return data that was set', () => {
        const c = new Cache();
        c.set(k, v);
        expect(c.get(k)).toBe(v);
    });

    it('should return null if data that wasn\'t set', () => {
        const c = new Cache();
        expect(c.get(k)).toBeNull();
    });
});

describe('queries functionality tests', () => {
    const k = 'test';
    const k2 = 'jest';
    const v = 1;

    it('shouldn\'t return value if n_queries reaches zero', () => {
        const c = new Cache([[k, v]]);
        expect(c.get(k)).toEqual(v);
        expect(c.get(k)).toBeNull();
    })

    it('should respect specified n_queries', () => {
        const c = new Cache();
        c.set(k, v, 0);
        expect(c.get(k)).toBeNull();

        c.set(k2, v, 10);
        for (let i = 0; i < 10; i++) {
            expect(c.get(k2)).toEqual(v);
        }
        expect(c.get(k2)).toBeNull();
    });
});

describe('stats tests', () => {
    const k = 'test';
    const k2 = 'jest';
    const v = 1;

    it('should return empty list if data wasn\'t set', () => {
        const c = new Cache();
        expect(c.stats()).toEqual([]);
    });

    it('should still return empty list if get was not called', () => {
        const c = new Cache([[k, v]]);
        expect(c.stats()).toEqual([]);
    });

    it('should return different stats when data is setted/getted', () => {
        const c = new Cache([[k, v]]);
        c.get(k);
        expect(c.stats()).toEqual([{ key: k, value: v, queries: 1 }]);
        c.set(k2, v, 2);
        c.get(k2);
        expect(c.stats().sort()).toEqual([
            { key: k, value: v, queries: 1 },
            { key: k2, value: v, queries: 2 }
        ].sort());
    });
});

describe('smart constructor tests', () => {
    const k = 'test';
    const k2 = 'jest';
    const v = 1;

    it('should create new object if parameters of constructor are valid', () => {
        const c = new Cache([[k, v], [k2, v, 2]]);
        expect(c).not.toBeUndefined();
    });

    it('should throw an error if constructor parameters are invalid', () => {
        try {
            const c = new Cache([[k, v], [k2, v, 2, 'this prank is going to be crazy💀💀']]);
        }
        catch (e) {
            expect(e.message).toEqual("invalid parameter {jest,1,2,this prank is going to be crazy💀💀}");
        }

    });
});
