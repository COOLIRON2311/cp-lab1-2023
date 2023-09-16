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
        const c = new Cache();
        c.set(k, v);
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
