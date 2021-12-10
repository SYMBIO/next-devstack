export default function nbsp(txt: string | null | undefined): string | undefined {
    return txt
        ?.replace(
            /(\s|^)((["'„])*[_A-Za-z0-9\u0100-\u017F])((\s)([_A-Za-z0-9\u0100-\u017F]))+/gu,
            (match, p1) => p1 + match.substr(p1.length).replace(/\s/g, '\u00A0'),
        )
        .replace(/([0-9])\s%/, '$1\u00A0%')
        .replace(/(\s|^)([_A-Za-z0-9\u0100-\u017F])(\s)([_A-Za-z0-9\u0100-\u017F])/g, '$1$2\xA0$4');
}
