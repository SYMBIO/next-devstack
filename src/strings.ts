/* eslint-disable */
import { useRouter } from 'next/router';

const data: Record<string, Record<string, string>> = {};

export function transCount(cnt: number) {
    if (cnt === 0) {
        return 'zero';
    }
    if (cnt === 1) {
        return 'one';
    }
    if (cnt < 5) {
        return 'few';
    }
    return 'many';
}

export default function trans(key: string): string {
    const { locale } = useRouter();
    if (locale) {
        return data[locale][key] || data.cs[key] || key;
    } else {
        return key;
    }
}
