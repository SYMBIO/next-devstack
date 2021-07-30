/* eslint-disable */
import symbio from '../symbio.config.json';
const data: Record<string, Record<string, string>> = {
    cs: {
        'form.required': 'Povinné pole',
    },
    en: {
        'form.required': 'Required field',
    },
};

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

export default function trans(key: string, locale = symbio.i18n.defaultLocale): string {
    return data[locale][key] || data.cs[key] || key;
}
