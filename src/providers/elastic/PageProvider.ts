import { ParsedUrlQuery } from 'querystring';
import symbio from '../../../symbio.config.json';
import blocks from '../../blocks';
import { getStaticParamsFromBlocks } from '../../lib/blocks/getStaticParamsFromBlocks';
import { pageListQueryResponse } from '../../relay/__generated__/pageListQuery.graphql';
import { redirectListQueryResponse } from '../../relay/__generated__/redirectListQuery.graphql';
import { siteQueryResponse } from '../../relay/__generated__/siteQuery.graphql';
import { webSettingQueryResponse } from '../../relay/__generated__/webSettingQuery.graphql';
import { pageDetailQuery, pageListQuery } from '../../relay/page';
import * as d from '../../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../../relay/__generated__/pageListQuery.graphql';
import { AppData } from '../../types/app';
import AbstractElasticProvider from '../../lib/provider/AbstractElasticProvider';
import { pageDetailQueryResponse } from '../../relay/__generated__/pageDetailQuery.graphql';
import RedirectProvider from './RedirectProvider';
import providers from '../index';
import SiteProvider from './SiteProvider';
import WebSettingProvider from './WebSettingProvider';

class PageProvider extends AbstractElasticProvider<
    d.pageDetailQuery,
    l.pageListQuery,
    NonNullable<pageDetailQueryResponse['item']>,
    NonNullable<pageListQueryResponse['items']>
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
     */
    async getPageBySlug(locale: string, slug: string[]): Promise<AppData> {
        const promises = [
            SiteProvider.get(locale),
            WebSettingProvider.get(locale),
            this.findByElastic(
                {
                    body: {
                        query: {
                            bool: {
                                should: [
                                    {
                                        term: {
                                            url: {
                                                value: slug.length === 0 ? 'homepage' : slug.join('/'),
                                                boost: 5,
                                            },
                                        },
                                    },
                                    // dynamic routes
                                    slug.length > 1 && {
                                        regexp: {
                                            url: {
                                                value: slug.slice(0, slug.length - 1).join('/') + '/:([^/]+?)',
                                                boost: 3,
                                            },
                                        },
                                    },
                                    // catch-all routes
                                    ...(slug.length > 1
                                        ? slug.slice(1).map((s, i) => ({
                                              term: {
                                                  url: slug.slice(0, i + 1).join('/') + '/*',
                                              },
                                          }))
                                        : []),
                                ].filter((a) => a),
                                minimum_should_match: 1,
                            },
                        },
                        size: 1,
                    },
                },
                locale,
            ),
            RedirectProvider.findByElastic({
                body: {
                    query: {
                        bool: {
                            should: [
                                {
                                    term: {
                                        from: {
                                            value: '/' + slug.join('/'),
                                            boost: 5,
                                        },
                                    },
                                },
                            ],
                            minimum_should_match: 1,
                        },
                    },
                    size: 1,
                },
            }),
        ];

        const [site, webSetting, { data }, { data: redirects }] = (await Promise.all(promises)) as [
            siteQueryResponse['_site'],
            webSettingQueryResponse['item'],
            { data: l.pageListQueryResponse['items'] },
            { data: redirectListQueryResponse['items'] },
        ];

        const page = data[0] || null;

        return {
            site,
            webSetting,
            page: page as AppData['page'],
            redirect: Array.isArray(redirects) && redirects.length > 0 ? redirects[0] : null,
        };
    }

    async getStaticPaths(locale: string, defaultLocale: string): Promise<ParsedUrlQuery[]> {
        const params: ParsedUrlQuery[] = [];

        const { data } = await this.findByElastic({}, locale);

        // loop over all pages
        for (const page of data) {
            if (String(page.url) === 'homepage') {
                params.push({ slug: locale === defaultLocale ? [] : [locale] });
                continue;
            }
            if (String(page.url) === '404') {
                continue;
            }
            const url = (locale === defaultLocale ? '/' : `/${locale}/`) + page.url;
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
                    const pathParts = newUrl.split('/').slice(1);
                    params.push({ slug: pathParts });
                }
            } else {
                // build slug array
                const pathParts = url.split('/').slice(1);
                params.push({ slug: pathParts });
            }
        }

        return params;
    }
}

export default new PageProvider(pageDetailQuery, pageListQuery);
