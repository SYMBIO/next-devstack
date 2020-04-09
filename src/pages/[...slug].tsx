import { NextPage } from 'next';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/cs';
import Head from 'next/head';
import axios from 'axios';

import { Layout } from '../components/Layout/Layout';
import { Navbar } from '../components/Navbar/Navbar';
import { CALENDAR_FORMATS } from '../constants';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import { Logger } from '../services';
import { SiteLocale } from '../types/graphql';
import { MyPageContext, MyPageProps } from '../types/page';
import { AppContext } from '../utils/app-context/AppContext';

export const config = { amp: 'hybrid' };

const Page: NextPage<MyPageProps> = (props: MyPageProps) => {
    const { currentUrl } = useContext(AppContext);
    const { site, page, blocks, locale, settings, relayData } = props;

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
    });

    return (
        <AppContext.Provider value={{}}>
            <Head>
                <title>
                    {page && page.title}
                    {site && site.globalSeo && site.globalSeo.titleSuffix}
                </title>
                <link rel="icon" type="image/x-icon" href={'/favicon.ico'} />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>

            {isStaging && (
                <a
                    href={
                        'https://narodni-divadlo-cz.admin.datocms.com/editor/item_types/' +
                        (page ? `99631/items/${page.id}/edit` : '141896/items/1556599/edit')
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'block',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '50px',
                        height: '50px',
                        zIndex: 1000,
                        padding: '10px 20px 20px 10px',
                        backgroundColor: '#000',
                        color: '#fff',
                        borderBottomRightRadius: '50px',
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.947 383.947">
                        <g>
                            <g>
                                <g fill="#fff">
                                    <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893" />
                                    <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04 C386.027,77.92,386.027,64.373,377.707,56.053z" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
            )}

            <Layout>
                <Navbar />
                {blocks?.map((Block) => (
                    <Block />
                ))}
            </Layout>
        </AppContext.Provider>
    );
};

Page.getInitialProps = async (ctx: MyPageContext): Promise<MyPageProps> => {
    Logger.log('[...slug] getInitialProps');

    const {
        req,
        res,
        query: { slug },
        asPath,
        environment,
    } = ctx;

    if (!environment) {
        throw new Error('No relay environment');
    }

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

    const { data } = await axios.get('/api/content?url=' + encodeURIComponent(currentUrl), {
        responseType: 'json',
    });

    const { site, webSetting: settings, redirect, page, blocks } = data;

    if (!page) {
        const err: any = new Error();
        err.code = 'ENOENT';
        throw err;
    }

    const gIPPromises = [];
    for (const block of blocks) {
        const blockName = block.__typename.replace('Record', 'Block');
        const blk: NextComponentType<MyPageContext, MyPageProps, MyPageProps> = dynamic(() =>
            import('../blocks/' + blockName),
        );
        if (blk.getInitialProps) {
            gIPPromises.push(blk.getInitialProps(ctx));
        }
    }

    const relayData = await Promise.all(gIPPromises);

    return {
        site,
        page,
        settings,
        blocks,
        locale,
        relayData,
    };
};

export default Page;
