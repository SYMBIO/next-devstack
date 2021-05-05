const charset = 'abcdefghijklmnopqrstuvwxyz';

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElem(): string {
    return charset[randomInt(0, charset.length - 1)];
}

export default function randomString(length: number): string {
    return Array.from(Array(length).keys())
        .map(() => randomElem())
        .join('');
}
