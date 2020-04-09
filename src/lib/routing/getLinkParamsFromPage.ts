import { ParsedUrlQuery } from 'querystring';
import { getLinkParamsFromUrl, LinkParams } from './getLinkParamsFromUrl';
import { getUrlFromPage } from './getUrlFromPage';

export function getLinkParamsFromPage(
    page: { url: string | null },
    locale: string,
    params: Record<string, string | number> | ParsedUrlQuery | undefined,
): LinkParams {
    return getLinkParamsFromUrl(getUrlFromPage(page, locale, params));
}
