export function getPatternFromQueryObject(slug: string[] | string): string | null {
    if (Array.isArray(slug) && slug.length > 0) {
        return '^' + slug.join('/') + '$';
    } else if (slug && !Array.isArray(slug)) {
        return '^' + slug + '$';
    } else {
        return '^homepage$';
    }
}

export function getDynamicPatternFromQueryObject(slug: string[] | string): string | null {
    const dynamicPattern = ':([^/]+?)';

    if (Array.isArray(slug) && slug.length > 0) {
        return '^' + slug.slice(0, slug.length - 1).join('/') + '/' + dynamicPattern + '$';
    } else {
        return null;
    }
}

export function getPagePattern(slug: string[] | string): string {
    const pattern = getPatternFromQueryObject(slug);
    const dynamicPattern = getDynamicPatternFromQueryObject(slug);

    if (!pattern) {
        return 'Nesmyslna adresa';
    }

    return dynamicPattern ? pattern + '|' + dynamicPattern : pattern;
}
