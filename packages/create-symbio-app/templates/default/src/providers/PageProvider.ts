import { GetStaticPathsResult } from 'next';
import { fetchQuery } from 'react-relay';
import AbstractDatoCMSProvider from '@symbio/cms-datocms/dist/providers/DatoCMSProvider';
import { pageDetailQuery, pageListQuery, pageStaticPathsQuery } from '../relay/page';
import * as d from '../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../relay/__generated__/pageListQuery.graphql';
import * as s from '../relay/__generated__/pageStaticPathsQuery.graphql';
import { appQuery, SiteLocale } from '../relay/__generated__/appQuery.graphql';
import { AppQuery } from '../relay/app';
import { getPagePattern } from '@symbio/headless/dist/lib/routing/getPagePattern';
import { AppData, PageProvider as PageProviderProps } from '@symbio/cms';
import { ParsedUrlQuery } from 'querystring';
import { getStaticParamsFromBlocks } from '@symbio/headless/dist/lib/blocks/getStaticParamsFromBlocks';
import providers from './index';
import { BlockType } from '@symbio/headless/dist/types/block';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';

class PageProvider
    extends AbstractDatoCMSProvider<d.pageDetailQuery, l.pageListQuery>
    implements PageProviderProps<PageProps, WebSettingsProps> {
    /**
     * Special function returning Page and Site data
     * @param locale
     * @param slug
     * @param preview
     */
    async getPageBySlug(
        locale: string | undefined,
        slug: string[],
        preview = false,
    ): Promise<AppData<PageProps, WebSettingsProps> | undefined> {
        const pattern = getPagePattern(slug);
        const redirectPattern = slug.join('/');
        return await fetchQuery<appQuery>(this.getEnvironment(preview), AppQuery, {
            ...(locale ? { locale: locale as SiteLocale } : {}),
            pattern,
            redirectPattern,
        }).toPromise();
    }

    async getStaticPaths(
        locale: string | undefined,
        blocks?: Record<string, BlockType<PageProps, WebSettingsProps, Providers, Locale>>,
    ): Promise<GetStaticPathsResult['paths']> {
        const params: ParsedUrlQuery[] = [];

        let cnt = -1;
        let done = 0;
        do {
            const data = await fetchQuery<s.pageStaticPathsQuery>(this.getEnvironment(false), pageStaticPathsQuery, {
                locale: locale as SiteLocale,
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
                    if (url && blocks && locale) {
                        const blocksParams = await getStaticParamsFromBlocks<
                            PageProps,
                            WebSettingsProps,
                            Providers,
                            Locale
                        >(page.content, locale, providers, blocks);
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
