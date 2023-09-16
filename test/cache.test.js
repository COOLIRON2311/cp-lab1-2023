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
