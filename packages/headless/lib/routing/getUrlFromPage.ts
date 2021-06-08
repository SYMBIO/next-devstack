import { ParsedUrlQuery } from 'querystring';
import { BasePage } from '@symbio/cms';

export function getUrlFromPage(
    page: BasePage,
    params: Record<string, string | number> | ParsedUrlQuery | undefined,
): string {
    let url = page.url?.substr(0, 1) === '?' ? page.url : page.url && page.url !== 'homepage' ? '/' + page.url : '/';
    const hash = params && params['#'] ? '#' + params['#'] : '';

    if (params && params['#']) {
        delete params['#'];
    }

    if (params) {
        const tmpParams = new Map(Object.entries(params));
        for (const key in params) {
            if (url.indexOf(':' + key) !== -1 && key !== 'url') {
                tmpParams.delete(key);
                url = url.replace(':' + key, params[key]?.toString() || '');
            }
        }

        if (url.endsWith('*') && tmpParams.has('url')) {
            url = url.replace('*', tmpParams.get('url'));
            tmpParams.delete('url');
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
