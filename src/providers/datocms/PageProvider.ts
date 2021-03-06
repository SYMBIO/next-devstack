import { GetStaticPathsResult } from 'next';
import { fetchQuery } from 'react-relay';
import symbio from '../../../symbio.config.json';
import AbstractDatoCMSProvider from '../../lib/provider/AbstractDatoCMSProvider';
import { getSiteLocale } from '../../lib/routing/getSiteLocale';
import { pageDetailQueryResponse } from '../../relay/__generated__/pageDetailQuery.graphql';
import { pageListQueryResponse } from '../../relay/__generated__/pageListQuery.graphql';
import { pageDetailQuery, pageListQuery, pageStaticPathsQuery } from '../../relay/page';
import * as d from '../../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../../relay/__generated__/pageListQuery.graphql';
import * as s from '../../relay/__generated__/pageStaticPathsQuery.graphql';
import { appQuery } from '../../relay/__generated__/appQuery.graphql';
import { AppQuery } from '../../relay/app';
import { getPagePattern } from '../../lib/routing/getPagePattern';
import { AppData } from '../../types/app';
import { ParsedUrlQuery } from 'querystring';
import { getStaticParamsFromBlocks } from '../../lib/blocks/getStaticParamsFromBlocks';
import providers from '../../providers';
import { BlockType } from '../../types/block';

class PageProvider extends AbstractDatoCMSProvider<
    d.pageDetailQuery,
    l.pageListQuery,
    pageDetailQueryResponse['item'],
    pageListQueryResponse['items']
> {
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
     * @param preview
     */
    async getPageBySlug(locale: string | undefined, slug: string[], preview = false): Promise<AppData | undefined> {
        const pattern = getPagePattern(slug);
        const redirectPattern = slug.join('/');
        const data = await fetchQuery<appQuery>(this.getEnvironment(preview), AppQuery, {
            ...(locale ? { locale: getSiteLocale(locale) } : {}),
            pattern,
            redirectPattern,
        }).toPromise();

        return data;
    }

    async getStaticPaths(locale: string, blocks: Record<string, BlockType>): Promise<GetStaticPathsResult['paths']> {
        const params: ParsedUrlQuery[] = [];

        let cnt = -1;
        let done = 0;
        do {
            const data = await fetchQuery<s.pageStaticPathsQuery>(this.getEnvironment(false), pageStaticPathsQuery, {
                locale: getSiteLocale(locale),
                first: 100,
                skip: done,
            }).toPromise();

            if (data) {
                const { allPages, _allPagesMeta } = data;
                if (cnt === -1) {
                    cnt = Number(_allPagesMeta.count);
                }
                // loop over all pages
                for (const page of allPages) {
                    if (String(page.url) === 'homepage') {
                        params.push({ slug: [] });
                        continue;
                    }
                    if (String(page.url) === '404') {
                        continue;
                    }
                    const url = page.url;
                    if (url) {
                        const blocksParams = await getStaticParamsFromBlocks(page.content, locale, providers, blocks);
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
                                const pathParts = newUrl.split('/');
                                params.push({ slug: pathParts, locale });
                            }
                        } else {
                            // build slug array
                            const pathParts = url.split('/');
                            params.push({ slug: pathParts, locale });
                        }
                    }
                }

                done += allPages.length;
            }
        } while (done < cnt);

        return params.map((p) => ({
            params: p,
            locale,
        }));
    }
}

export default new PageProvider(pageDetailQuery, pageListQuery);
