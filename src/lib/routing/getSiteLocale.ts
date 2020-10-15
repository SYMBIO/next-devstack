import { SiteLocale } from '../../relay/__generated__/appQuery.graphql';
import { i18n } from '../../../symbio.config.json';

export function getSiteLocale(strLocale?: string): SiteLocale {
    return (strLocale || i18n.defaultLocale) as SiteLocale;
}
