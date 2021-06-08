import { GetStaticPathsResult } from 'next';
import { fetchQuery } from 'react-relay';
import AbstractDatoCMSProvider from '@symbio/cms-datocms/dist/providers/AbstractDatoCMSProvider';
import { pageDetailQueryResponse } from '../relay/__generated__/pageDetailQuery.graphql';
import { pageListQueryResponse } from '../relay/__generated__/pageListQuery.graphql';
import { pageDetailQuery, pageListQuery, pageStaticPathsQuery } from '../relay/page';
import * as d from '../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../relay/__generated__/pageListQuery.graphql';
import * as s from '../relay/__generated__/pageStaticPathsQuery.graphql';
import { appQuery } from '../relay/__generated__/appQuery.graphql';
import { AppQuery } from '../relay/app';
import { getPagePattern } from '@symbio/headless/dist/lib/routing/getPagePattern';
import { AppData } from '@symbio/cms';
import { ParsedUrlQuery } from 'querystring';
import { getStaticParamsFromBlocks } from '@symbio/headless/dist/lib/blocks/getStaticParamsFromBlocks';
import providers from './index';
import { BlockType } from '@symbio/headless/types/block';

class PageProvider extends AbstractDatoCMSProvider<
    d.pageDetailQuery,
    l.pageListQuery,
    pageDetailQueryResponse['item'],
    pageListQueryResponse['items']
> {
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
            ...(locale ? { locale } : {}),
            pattern,
            redirectPattern,
        }).toPromise();

        return data;
    }

    async getStaticPaths(
        locale: string | undefined,
        blocks: Record<string, BlockType>,
    ): Promise<GetStaticPathsResult['paths']> {
        const params: ParsedUrlQuery[] = [];

        let cnt = -1;
        let done = 0;
        do {
            const data = await fetchQuery<s.pageStaticPathsQuery>(this.getEnvironment(false), pageStaticPathsQuery, {
                locale,
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

export default new PageProvider(pageDetailQuery, pageListQuery, {
    id: '184261',
    apiKey: 'page',
    locales: ['cs', 'en'],
});
