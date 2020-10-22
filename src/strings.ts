/* eslint-disable */
import { useContext } from 'react';
import { AppContext } from './contexts/app-context/AppContext';

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
    const { locale } = useContext(AppContext);
    return data[locale][key] || data.cs[key] || key;
}
