import { ParsedUrlQuery } from 'querystring';

export function getPatternFromQueryObject(query: ParsedUrlQuery): string | null {
    if (Array.isArray(query.slug)) {
        return '^' + query.slug.join('/') + '$';
    } else if (query.slug) {
        return '^' + query.slug + '$';
    } else {
        return '^homepage$';
    }
}

export function getDynamicPatternFromQueryObject(query: ParsedUrlQuery): string | null {
    const dynamicPattern = ':([^/]+?)';

    if (Array.isArray(query.slug)) {
        return '^' + query.slug.slice(0, query.slug.length - 1).join('/') + '/' + dynamicPattern + '$';
    } else {
        return null;
    }
}

export function getPagePattern(query: ParsedUrlQuery): string {
    const pattern = getPatternFromQueryObject(query);
    const dynamicPattern = getDynamicPatternFromQueryObject(query);

    if (!pattern) {
        return 'Nesmyslna adresa';
    }

    return dynamicPattern ? pattern + '|' + dynamicPattern : pattern;
}
