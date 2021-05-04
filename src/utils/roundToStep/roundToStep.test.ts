import roundToStep from './';

const step = 0.5;

describe('roundToStep', () => {
    it('2.74', () => {
        const valid = roundToStep(2.74, step);
        expect(valid).toBe(2.5);
    });

    it('2.75', () => {
        const valid = roundToStep(2.75, step);
        expect(valid).toBe(3);
    });

    it('2.4', () => {
        const valid = roundToStep(2.4, step);
        expect(valid).toBe(2.5);
    });

    it('2.2', () => {
        const valid = roundToStep(2.2, step);
        expect(valid).toBe(2);
    });
});
