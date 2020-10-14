import { UrlObject } from 'url';

export function getRouteParamsFromUrl(url: string): UrlObject {
    const parts = url.split('/');

    return {
        pathname: '/[[...slug]]',
        query: {
            locale: parts[1],
            slug: parts.slice(2),
        },
    };
}
