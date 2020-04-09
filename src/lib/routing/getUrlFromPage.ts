import { ParsedUrlQuery } from 'querystring';

export function getUrlFromPage(
    page: { url: string | null },
    locale: string,
    params: Record<string, string | number> | ParsedUrlQuery | undefined,
): string {
    let url = page.url?.substr(0, 1) === '?' ? page.url : '/' + locale + (page.url ? '/' + page.url : '');
    const hash = params && params['#'] ? '#' + params['#'] : '';

    if (params && params['#']) {
        delete params['#'];
    }

    if (params) {
        const tmpParams = new Map(Object.entries(params));
        for (const key in params) {
            if (url.indexOf(':' + key) !== -1) {
                tmpParams.delete(key);
                url = url.replace(':' + key, params[key].toString());
            }
        }

        if (tmpParams.size > 0) {
            const queryParams = [];
            // add other params as query string params
            for (const [key, value] of tmpParams) {
                queryParams.push(key + '=' + encodeURIComponent(value));
            }
            url += '?' + queryParams.join('&');
        }
    }

    url += hash;

    return url;
}
