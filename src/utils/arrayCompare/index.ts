export default (array1: number[] | string[], array2: number[] | string[]) =>
    array1.length === array2.length &&
    array1.every((value: number | string, index: number): boolean => Number(value) === Number(array2[index]));
