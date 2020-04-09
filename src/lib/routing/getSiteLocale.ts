import { SiteLocale } from '../../types/graphql';
import capitalize from '../../utils/capitalize';

export function getSiteLocale(strLocale?: string): SiteLocale {
    if (strLocale) {
        for (const locale in SiteLocale) {
            if (locale === strLocale) {
                return (SiteLocale as any)[locale];
            }
        }
    }

    for (const locale in SiteLocale) {
        return (SiteLocale as any)[locale];
    }

    return (SiteLocale as any)[0];
}
