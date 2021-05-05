import { getRouteParamsFromUrl } from './getRouteParamsFromUrl';

export interface LinkParams {
    href?: string;
    as: string;
}

export function getLinkParamsFromUrl(url: string): LinkParams {
    return {
        href: getRouteParamsFromUrl(url).pathname || undefined,
        as: url,
    };
}
