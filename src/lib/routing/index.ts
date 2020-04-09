import { AppContext } from '../../utils/app-context/AppContext';
import { useContext } from 'react';

interface PageLinkParams {
    page?: { url: string; title?: string };
    params?: Record<string, string | number>;
}

interface PageObject {
    __typename: 'PageRecord';
    url: string;
}

interface NewsObject {
    __typename: 'NewsRecord';
    slug: string;
}

export function getLinkParamsForObject(object: PageObject | NewsObject): PageLinkParams | void {
    const ctx = useContext(AppContext);
    if (!object) {
        return;
    }

    switch (object.__typename) {
        case 'PageRecord':
            return {
                page: {
                    url: object.url,
                },
            };
        case 'NewsRecord':
            return {
                page: ctx.newsPage,
                params: {
                    slug: object.slug,
                },
            };
        default:
            return { page: { url: '' } };
    }
}
