import React, { ReactElement, useEffect } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import moment from 'moment-timezone';
import 'moment/locale/cs';
import { fetchQuery, ReactRelayContext } from 'react-relay';

import { EditPage } from '../components';
import { Head } from '../components';
import { Layout } from '../components';
import { Navbar } from '../components';
import { CALENDAR_FORMATS } from '../constants';
import BlockFactory from '../lib/blocks/BlockFactory';
import '../blocks';
import { PageCacheFactory } from '../lib/pageCache/PageCacheFactory';
import { createRelayEnvironment } from '../lib/relay/createRelayEnvironment';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import { staticPathsQuery as sPQ } from '../relay/api/__generated__/staticPathsQuery.graphql';
import { staticPathsQuery } from '../relay/api/staticPaths';
import { Logger } from '../services';
import symbio from '../../symbio.config';
import { AppData, MyPageProps } from '../types/app';
import { SiteLocale } from '../types/graphql';
import { AppContext } from '../utils/app-context/AppContext';
import isStaging from '../utils/isStaging';

export const config = { amp: 'hybrid' };

const Page = (props: MyPageProps): ReactElement => {
    const {
        currentUrl,
        hostname,
        site,
        page,
        blocksData,
        locale,
        webSetting,
        blocksInitialProps,
        relayRecords,
    } = props;

    moment.locale(locale, { calendar: CALENDAR_FORMATS[locale] });

    const environment = createRelayEnvironment(relayRecords, false);

    if (!page || !webSetting) {
        return <>No page</>;
    }

    useEffect(() => {
        const url = currentUrl?.split('/') || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            event: 'ga.page',
            pagePath: currentUrl,
            pageCategory1: url[2] || '',
            pageCategory2: url[3] || '',
            pageCategory3: url[4] || '',
            pageCategory4: url[5] || '',
            pageCategory5: url[6] || '',
        });
    }, [currentUrl]);

    return (
        <ReactRelayContext.Provider
            value={{
                environment,
            }}
        >
            <AppContext.Provider
                value={{
                    locale,
                    currentUrl,
                    hostname,
                    absoluteLinks: false,
                    ...webSetting,
                }}
            >
                <Head page={page} site={site} />

                {isStaging() && <EditPage page={page} />}

                <Layout>
                    <Navbar />
                    {blocksData?.map((block, i) => {
                        const blockName = block?.__typename?.replace('Record', 'Block');
                        if (!blockName || !BlockFactory.has(blockName)) {
                            return null;
                        }
                        const BlockComponent = BlockFactory.get(blockName);
                        const blockInitialProps = blocksInitialProps[i];
                        return (
                            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                            // @ts-ignore
                            <BlockComponent key={`page_${page.id}_block_${i}`} content={block} {...blockInitialProps} />
                        );
                    })}
                </Layout>
                {symbio.gtm.code && (
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="https://www.googletagmanager.com/ns.html?id=${symbio.gtm.code}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        <!-- End Google Tag Manager (noscript) -->`,
                        }}
                    />
                )}
            </AppContext.Provider>
        </ReactRelayContext.Provider>
    );
};

/*export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, params } = context;

    const slug = params?.slug || [];
    const currentUrl = req.url;
    const hostname = req.headers.host;
    const locale: SiteLocale =
        (symbio.i18n.useLocaleInPath && slug && Array.isArray(slug) && getSiteLocale(slug[0])) || getSiteLocale();

    moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    moment.locale(locale);

    Logger.log(req?.method + ': ' + currentUrl);

    if (res) {
        res.setHeader('Cache-Control', `public, s-maxage=${symbio.cache.maxAge}, stale-while-revalidate`);
    }

    // load app data from API
    const { data } = await axios.get(
        (hostname === 'localhost:3000' ? 'http://' : 'https://') +
            hostname +
            '/api' +
            (currentUrl === '/' ? '/homepage' : currentUrl),
    );
    const environment = createRelayEnvironment({}, false);
    const { redirect, page, blocksData }: AppData = data;

    // if redirect found - let's do it
    if (redirect && redirect.to && res) {
        res.statusCode = Number(redirect.httpStatus);
        res.setHeader('Location', redirect.to);
        res.end(`<script>document.location.href = '${redirect.to}'`);
        return {
            ...data,
        };
    }

    // if page doesn't exist -> 404
    if (!page) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err: any = new Error('Page not found');
        err.code = 'ENOENT';
        throw err;
    }

    // blocks initial props handling
    const bIPPromises = [];
    if (blocksData) {
        for (const block of blocksData) {
            const blockName = block?.__typename?.replace('Record', 'Block');
            if (blockName && BlockFactory.has(blockName)) {
                const blk = BlockFactory.get(blockName);
                if (blk && blk.getServerSideProps) {
                    bIPPromises.push(blk.getServerSideProps({ ...context, locale, environment }));
                } else {
                    bIPPromises.push(Promise.resolve({}));
                }
            } else {
                bIPPromises.push(Promise.resolve({}));
            }
        }
    }
    const blocksInitialProps = await Promise.all(bIPPromises);

    return {
        props: {
            ...data,
            locale,
            currentUrl,
            hostname,
            blocksInitialProps,
            relayRecords: environment.getStore().getSource().toJSON(),
        },
    };
};*/

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    const locale: SiteLocale = symbio.i18n.useLocaleInPath ? getSiteLocale(String(params?.slug[0])) : getSiteLocale();
    const environment = createRelayEnvironment({}, false);
    const pathParts = params?.slug.slice(symbio.i18n.useLocaleInPath ? 1 : 0);
    if (pathParts) {
        const cache = PageCacheFactory.get();
        const props = await cache.get(locale, Array.isArray(pathParts) ? pathParts : [pathParts]);
        const bIPPromises = [];
        if (props.blocksData) {
            for (const block of props.blocksData) {
                const blockName = block?.__typename?.replace('Record', 'Block');
                if (blockName && BlockFactory.has(blockName)) {
                    const blk = BlockFactory.get(blockName);
                    if (blk && blk.getStaticProps) {
                        bIPPromises.push(blk.getStaticProps({ ...context, locale, environment }));
                    } else {
                        bIPPromises.push(Promise.resolve({}));
                    }
                } else {
                    bIPPromises.push(Promise.resolve({}));
                }
            }
        }
        const blocksInitialProps = await Promise.all(bIPPromises);
        console.log('getStaticProps end');

        return {
            props: {
                ...props,
                blocksInitialProps,
            },
        };
    }

    return {
        props: {},
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const environment = createRelayEnvironment({}, false);
    const { useLocaleInPath } = symbio.i18n;
    const paths: string[] = [];
    for (const locale in SiteLocale) {
        if (Object.prototype.hasOwnProperty.call(SiteLocale, locale)) {
            let cnt = -1;
            let done = 0;
            do {
                const { allPages, _allPagesMeta } = await fetchQuery<sPQ>(environment, staticPathsQuery, {
                    locale: getSiteLocale(locale),
                    first: 100,
                    skip: 0,
                });
                if (cnt === -1) {
                    cnt = Number(_allPagesMeta.count);
                }
                done += allPages.length;
                paths.concat(...allPages.map((p) => (useLocaleInPath ? '/' + locale + '/' + p.url : '/' + p.url)));
            } while (done < cnt);
        }
    }

    return {
        paths,
        fallback: true,
    };
};

export default Page;
