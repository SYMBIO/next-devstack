import { ParsedUrlQuery } from 'querystring';
import { BasePage } from '../../types/app';
import { getLinkParamsFromUrl, LinkParams } from './getLinkParamsFromUrl';
import { getUrlFromPage } from './getUrlFromPage';

export function getLinkParamsFromPage(
    page: BasePage,
    params: Record<string, string | number> | ParsedUrlQuery | undefined,
): LinkParams {
    return getLinkParamsFromUrl(getUrlFromPage(page, params));
}