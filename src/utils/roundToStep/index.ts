export default function roundToHalf(value: number, step = 1): number {
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}
