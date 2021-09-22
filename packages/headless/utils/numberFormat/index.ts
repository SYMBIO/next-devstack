export default function numberFormat(str: string | number): string {
    return String(str).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ');
}
