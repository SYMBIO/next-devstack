import arrayCompare from './index';

describe('array compare', () => {
    it('same length', () => {
        const array1 = ['1'];
        const array2 = ['1'];
        const valid = arrayCompare(array1, array2);
        expect(valid).toBeTruthy();
    });

    it('same length, different values', () => {
        const array1 = ['1'];
        const array2 = ['2'];
        const valid = arrayCompare(array1, array2);
        expect(valid).toBeFalsy();
    });

    it('different length, different values', () => {
        const array1 = ['1', '2', '3'];
        const array2 = ['2'];
        const valid = arrayCompare(array1, array2);
        expect(valid).toBeFalsy();
    });

    it('same length, different values', () => {
        const array1 = ['1', '2', '3'];
        const array2 = ['2', '1', '3'];
        const valid = arrayCompare(array1, array2);
        expect(valid).toBeFalsy();
    });
});
