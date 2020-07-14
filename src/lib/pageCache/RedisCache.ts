import { fetchQuery, graphql } from 'react-relay';
import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
import { appQueryResponse } from '../../relay/__generated__/appQuery.graphql';
import { Logger } from '../../services';
import { AppData } from '../../types/app';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { getPagePattern } from '../routing/getPagePattern';
import { getSiteLocale } from '../routing/getSiteLocale';
import { RedisCacheAppQuery } from './__generated__/RedisCacheAppQuery.graphql';
import { RedisCachePagesQuery } from './__generated__/RedisCachePagesQuery.graphql';
import { RedisCacheRedirectsQuery } from './__generated__/RedisCacheRedirectsQuery.graphql';
import { AbstractPageCache } from './AbstractPageCache';
import symbio from '../../../symbio.config.json';

if (symbio.pageCache === 'redis' && !process.env.REDIS_URL) {
    Logger.error('Trying to use Redis page cache without REDIS_URL env variable!');
    process.exit(1);
}

export const AppQuery = graphql`
    query RedisCacheAppQuery($locale: SiteLocale) {
        site: _site(locale: $locale) {
            ...appSiteFragment @relay(mask: false)
        }
        webSetting(locale: $locale) {
            ...appWebSettingFragment @relay(mask: false)
        }
    }
`;

const PagesQuery = graphql`
    query RedisCachePagesQuery($locale: SiteLocale!, $filter: PageModelFilter, $first: IntType!, $skip: IntType!) {
        _allPagesMeta(locale: $locale, filter: $filter) {
            count
        }
        allPages(locale: $locale, filter: $filter, first: $first, skip: $skip) {
            ...appPageFragment @relay(mask: false)
            content {
                ...blocksContent @relay(mask: false)
            }
        }
    }
`;

const RedirectsQuery = graphql`
    query RedisCacheRedirectsQuery($filter: RedirectModelFilter, $first: IntType!, $skip: IntType!) {
        _allRedirectsMeta(filter: $filter) {
            count
        }
        allRedirects(filter: $filter, first: $first, skip: $skip) {
            from
            to
            httpStatus
        }
    }
`;

export class RedisCache extends AbstractPageCache {
    private readonly key = 'pageCache';

    private getClient(): Promise<RedisClient> {
        return new Promise((resolve) => {
            const client = redis.createClient({
                url: process.env.REDIS_URL,
            });

            client.on('connect', () => {
                resolve(client);
            });
        });
    }

    async get(locale: string, pathParts: string[]): Promise<AppData> {
        const client = await this.getClient();
        const getAsync = promisify(client.get).bind(client);
        let objData = null;
        let data = await getAsync(this.key + '_' + locale);
        if (data) {
            objData = JSON.parse(data);
        }

        if (data === null) {
            await this.update();
            data = await getAsync(this.key + '_' + locale);
            if (data) {
                objData = JSON.parse(data);
            }
        }

        client.quit();

        const pattern = getPagePattern(pathParts);
        if (objData !== null) {
            return {
                site: objData.site,
                webSetting: objData.webSetting,
                page: this.getPage(objData.pages, pattern),
                redirect: this.getRedirect(objData.redirects, pathParts.join('/')),
                blocksData: this.getBlocksData(objData.blocksData, pattern),
            };
        } else {
            return {
                site: {
                    favicon: null,
                    faviconMetaTags: [],
                    globalSeo: null,
                },
                webSetting: null,
                page: null,
                redirect: null,
                blocksData: null,
            };
        }
    }

    getPage(pages: Record<string, AppData['page']>, pattern: string): AppData['page'] {
        const regex = new RegExp(pattern);
        for (const url in pages) {
            if (Object.prototype.hasOwnProperty.call(pages, url)) {
                if (regex.test(url)) {
                    return pages[url];
                }
            }
        }
        return null;
    }

    getRedirect(redirects: Record<string, AppData['redirect']>, url: string): AppData['redirect'] {
        for (const key in redirects) {
            if (Object.prototype.hasOwnProperty.call(redirects, key)) {
                if (url === key) {
                    return redirects[key];
                }
            }
        }
        return null;
    }

    getBlocksData(blocksData: Record<string, AppData['blocksData']>, pattern: string): AppData['blocksData'] {
        const regex = new RegExp(pattern);
        for (const url in blocksData) {
            if (Object.prototype.hasOwnProperty.call(blocksData, url)) {
                if (regex.test(url)) {
                    return blocksData[url];
                }
            }
        }
        return null;
    }

    async reset(): Promise<void> {
        return Promise.resolve(undefined);
    }

    async update(): Promise<void> {
        const environment = createRelayEnvironment({}, false);

        for (const loc in symbio.locales) {
            if (Object.prototype.hasOwnProperty.call(symbio.locales, loc)) {
                const locale = getSiteLocale(loc);
                const { site, webSetting } = await fetchQuery<RedisCacheAppQuery>(environment, AppQuery, {
                    locale,
                });

                const pages: Record<string, Omit<appQueryResponse['page'], 'content'>> = {};
                const blocksData: Record<string, any> = {};
                let skip = 0,
                    count = 0;
                do {
                    const { _allPagesMeta, allPages } = await fetchQuery<RedisCachePagesQuery>(
                        environment,
                        PagesQuery,
                        {
                            locale,
                            first: 100,
                            skip,
                        },
                    );
                    count = Number(_allPagesMeta.count);
                    skip += allPages.length;
                    for (const page of allPages) {
                        const p = { ...page, content: undefined };
                        if (page.url !== null) {
                            blocksData[page.url] = page.content;
                            delete p.content;
                            pages[page.url] = p;
                        }
                    }
                } while (count !== 0 && (skip === 0 || skip < count));

                const redirects: Record<string, appQueryResponse['redirect']> = {};
                let skip2 = 0,
                    count2 = 0;
                do {
                    const { _allRedirectsMeta, allRedirects } = await fetchQuery<RedisCacheRedirectsQuery>(
                        environment,
                        RedirectsQuery,
                        { first: 100, skip: skip2 },
                    );
                    count2 = Number(_allRedirectsMeta.count);
                    skip2 += allRedirects.length;
                    for (const redirect of allRedirects) {
                        if (redirect.from !== null) {
                            redirects[redirect.from] = { to: redirect.to, httpStatus: redirect.httpStatus };
                        }
                    }
                } while (count2 !== 0 && (skip2 === 0 || skip2 < count2));

                const client = await this.getClient();
                const setAsync = promisify(client.set).bind(client);
                await setAsync(
                    this.key + '_' + locale,
                    JSON.stringify({
                        site,
                        webSetting,
                        pages,
                        redirects,
                        blocksData,
                    }),
                );
                client.quit();
            }
        }
        return;
    }
}
