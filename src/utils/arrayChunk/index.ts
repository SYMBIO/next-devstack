export default function chunk(arr: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
}
