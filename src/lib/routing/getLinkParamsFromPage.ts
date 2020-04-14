import { ParsedUrlQuery } from 'querystring';
import { Page } from '../../types/app';
import { getLinkParamsFromUrl, LinkParams } from './getLinkParamsFromUrl';
import { getUrlFromPage } from './getUrlFromPage';

export function getLinkParamsFromPage(
    page: Page,
    locale: string,
    params: Record<string, string | number> | ParsedUrlQuery | undefined,
): LinkParams {
    return getLinkParamsFromUrl(getUrlFromPage(page, locale, params));
}
