import { ParsedUrlQuery } from 'querystring';
import { PageRecord } from '../../types/graphql';
import { getLinkParamsFromUrl, LinkParams } from './getLinkParamsFromUrl';
import { getUrlFromPage } from './getUrlFromPage';

export function getLinkParamsFromPage(
    page: PageRecord,
    locale: string,
    params: Record<string, string | number> | ParsedUrlQuery | undefined,
): LinkParams {
    return getLinkParamsFromUrl(getUrlFromPage(page, locale, params));
}
