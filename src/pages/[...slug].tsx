import { NextPage } from 'next';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/cs';
import Head from 'next/head';
import axios from 'axios';
import { ReactRelayContext } from 'react-relay';
import { EditPage } from '../components/EditPage/EditPage';

import { Layout } from '../components/Layout/Layout';
import { Navbar } from '../components/Navbar/Navbar';
import { CALENDAR_FORMATS } from '../constants';
import { createRelayEnvironment } from '../lib/relay/createRelayEnvironment';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import { Logger } from '../services';
import { BaseBlockProps } from '../types/block';
import { SiteLocale } from '../types/graphql';
import { MyPageContext, MyPageProps } from '../types/page';
import { AppContext } from '../utils/app-context/AppContext';

export const config = { amp: 'hybrid' };

const Page: NextPage<MyPageProps> = (props: MyPageProps) => {
    const { currentUrl } = useContext(AppContext);
    const { site, page, blocksData, locale, settings, relayRecords } = props;

    const environment = createRelayEnvironment(relayRecords, false);

    if (!page) {
        return <>No page</>;
    }

    const isStaging = process.env.DATOCMS_ENDPOINT?.substr(-7) === 'preview';

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
                    ...settings,
                }}
            >
                <Head>
                    <title>
                        {page && page.title}
                        {site && site.globalSeo && site.globalSeo.titleSuffix}
                    </title>
                    <link rel="icon" type="image/x-icon" href={'/favicon.ico'} />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                </Head>

                {isStaging && <EditPage page={page} />}

                <Layout>
                    <Navbar />
                    {page.content?.map((block, i) => {
                        const blockName = block?.__typename?.replace('Record', 'Block');
                        if (!blockName || !blocksData) {
                            return null;
                        }
                        const BlockComponent: NextComponentType<
                            MyPageContext,
                            BaseBlockProps,
                            BaseBlockProps
                        > = dynamic(() => import('../blocks/' + blockName));
                        return <BlockComponent key={`page_${page.id}_block_${i}`} content={blocksData[i]} />;
                    })}
                </Layout>
            </AppContext.Provider>
        </ReactRelayContext.Provider>
    );
};

Page.getInitialProps = async (ctx: MyPageContext): Promise<MyPageProps> => {
    Logger.log('[...slug] getInitialProps');

    const {
        req,
        res,
        query: { slug },
        asPath,
    } = ctx;

    const currentUrl = (req ? req.url : asPath) || '/';
    const locale: SiteLocale = (slug && Array.isArray(slug) && getSiteLocale(slug[0])) || getSiteLocale();

    moment.locale(locale, { calendar: CALENDAR_FORMATS[locale] });

    if (currentUrl) {
        Logger.log(''.padStart(currentUrl.length, '-'));
    }
    Logger.log(currentUrl);
    if (currentUrl) {
        Logger.log(''.padStart(currentUrl.length, '-'));
    }

    if (res) {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate');
    }

    const { data } = await axios.get('http://' + req?.headers.host + '/api' + currentUrl);

    const environment = createRelayEnvironment(data.relayRecords, false);

    const { site, webSetting: settings, redirect, page, blocksData } = data;

    if (!page) {
        const err: any = new Error();
        err.code = 'ENOENT';
        throw err;
    }

    const bIPPromises = [];
    for (const block of page.content) {
        const blockName = block.__typename.replace('Record', 'Block');
        const blk: NextComponentType<MyPageContext, MyPageProps, MyPageProps> = dynamic(() =>
            import('../blocks/' + blockName),
        );
        if (blk.getInitialProps) {
            bIPPromises.push(blk.getInitialProps(ctx));
        }
    }

    const relayData = await Promise.all(bIPPromises);

    return {
        site,
        page,
        settings,
        blocksData,
        locale,
        relayData,
        relayRecords: environment.getStore().getSource().toJSON(),
    };
};

export default Page;
