import { SiteLocale } from '../../relay/__generated__/appQuery.graphql';
import symbio from '../../../symbio.config.json';

export function getSiteLocale(strLocale?: string): SiteLocale {
    return (strLocale || symbio.i18n.defaultLocale) as SiteLocale;
}
