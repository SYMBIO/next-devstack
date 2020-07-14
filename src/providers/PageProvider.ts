import { ParsedUrlQuery } from 'querystring';
import { fetchQuery } from 'react-relay';
import symbio from '../../symbio.config.json';
import AbstractDatoCMSProvider from '../lib/provider/AbstractDatoCMSProvider';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import ProviderRegistry from '../lib/provider/ProviderRegistry';
import { pageDetailQuery, pageListQuery, pageStaticPathsQuery } from '../relay/page';
import * as d from '../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../relay/__generated__/pageListQuery.graphql';
import * as s from '../relay/__generated__/pageStaticPathsQuery.graphql';
import { appQuery } from '../relay/__generated__/appQuery.graphql';
import { AppQuery } from '../relay/app';
import { getPagePattern } from '../lib/routing/getPagePattern';
import { AppData } from '../types/app';
import { blocksContent } from '../blocks/__generated__/blocksContent.graphql';
import { getStaticParamsFromBlocks } from '../lib/server/getStaticParamsFromBlocks';

export default class PageProvider extends AbstractDatoCMSProvider<d.pageDetailQuery, l.pageListQuery> {
    getApiKey(): string {
        return 'page';
    }

    getId(): string {
        return symbio.datocms.pageTypeId;
    }

    /**
     * Special function returning Page and Site data
     * @param locale
     * @param slug
     */
    async getPageBySlug(locale: string, slug: string[]): Promise<AppData> {
        const pattern = getPagePattern(slug);
        const redirectPattern = slug.join('/');
        const data = await fetchQuery<appQuery>(this.environment, AppQuery, {
            locale: getSiteLocale(locale),
            pattern,
            redirectPattern,
        });

        const blocksData: ReadonlyArray<Omit<blocksContent, ' $refType'> | null> = data.page?.content || [];

        return {
            ...data,
            blocksData,
        };
    }

    async getStaticPaths(locale: string): Promise<ParsedUrlQuery[]> {
        const params: ParsedUrlQuery[] = [];
        const { useLocaleInPath } = symbio.i18n;

        let cnt = -1;
        let done = 0;
        do {
            const { allPages, _allPagesMeta } = await fetchQuery<s.pageStaticPathsQuery>(
                this.environment,
                pageStaticPathsQuery,
                {
                    locale: getSiteLocale(locale),
                    first: 100,
                    skip: done,
                },
            );
            if (cnt === -1) {
                cnt = Number(_allPagesMeta.count);
            }
            // loop over all pages
            for (const page of allPages) {
                if (!useLocaleInPath && String(page.url) === 'homepage') {
                    params.push({});
                    continue;
                }
                const url = String(page.url) === 'homepage' ? '' : '/' + page.url;
                const blocksParams = await getStaticParamsFromBlocks(page.content, locale);
                if (blocksParams.length > 0) {
                    for (const blockParams of blocksParams) {
                        let newUrl = url;
                        for (const key in blockParams) {
                            if (Object.prototype.hasOwnProperty.call(blockParams, key)) {
                                if (key === '*') {
                                    newUrl = newUrl.replace('/*', '/' + String(blockParams[key]));
                                } else {
                                    newUrl = newUrl?.replace(
                                        new RegExp('/:' + key + '(\\/|$)'),
                                        String('/' + blockParams[key] + '$1'),
                                    );
                                }
                            }
                        }
                        // build slug array
                        const pathParts = newUrl.split('/').slice(1);
                        params.push({ slug: useLocaleInPath ? [locale, ...pathParts] : pathParts });
                    }
                } else {
                    // build slug array
                    const pathParts = url.split('/').slice(1);
                    params.push({ slug: useLocaleInPath ? [locale, ...pathParts] : pathParts });
                }
            }

            done += allPages.length;
        } while (done < cnt);
        // console.log('------------------------ STATIC ROUTES ------------------------');
        // console.log(params);

        return params;
    }
}

ProviderRegistry.set(new PageProvider(pageDetailQuery, pageListQuery));
