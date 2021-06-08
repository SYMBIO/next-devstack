import { SiteLocale } from '../../relay/__generated__/appQuery.graphql';

export function getSiteLocale(strLocale?: string): SiteLocale {
    return strLocale as SiteLocale;
}
