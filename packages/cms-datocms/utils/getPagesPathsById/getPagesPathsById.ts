import { BasePage } from '@symbio/cms';
import { DatoCMSProvider } from '../../providers';

export default async function getPagesPathsById(
    id: string | string[],
    locale: string | string[],
    pageProvider: DatoCMSProvider<any, any>,
    defaultLocale: string,
    preview = false,
    foundPages: Array<BasePage> = [],
): Promise<string[]> {
    const paths = [];
    const ids = Array.isArray(id) ? id : [id];
    const locales = Array.isArray(locale) ? locale : [locale];
    const { data: pages } = await pageProvider.find({
        filter: {
            id: {
                in: ids,
            },
        },
        locale: locales[0],
        preview,
    });
    foundPages.push(...pages);
    for (const page of pages) {
        if (page) {
            for (const locale of locales) {
                const url = page._allUrlLocales?.find((ul: any) => ul?.locale === locale);
                if (url) {
                    paths.push(`${locale === defaultLocale ? '' : `/${locale}`}/${page.url.replace(/^homepage$/, '')}`);
                }
            }
        }
    }
    return paths;
}
