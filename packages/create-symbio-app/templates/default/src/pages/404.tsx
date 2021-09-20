import dayjs from 'dayjs';
import timeZone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import symbio from '../../symbio.config.json';
import blocks from '../blocks/server';
import { Blocks } from '../components/base/Blocks/Blocks';
import { Head } from '../components/base/Head/Head';
import { Layout } from '../components/base/Layout/Layout';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { CALENDAR_FORMATS } from '../constants';
import { ContextsProvider } from '@symbio/headless/dist/contexts';
import providers from '../providers';
import { MyPageProps } from '@symbio/headless';
import { trackPage } from '../utils/gtm';
import { getBlocksProps } from '@symbio/headless/dist/lib/blocks/getBlocksProps';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import AppStore from '@symbio/headless/dist/lib/store/AppStore';

const Page = (props: MyPageProps<PageProps, WebSettingsProps>): ReactElement => {
    const { hostname, site, page, webSetting, blocksPropsMap, redirect } = props;
    const { gtm, tz } = symbio;
    const router = useRouter();
    const locale = router.locale || router.defaultLocale;
    const currentUrl =
        '/' + (router.locale === router.defaultLocale ? '' : router.locale) + router.asPath !== '/'
            ? router.asPath
            : '';

    useEffect(() => {
        trackPage(currentUrl);
    }, []);

    const app = {
        currentUrl,
        hostname,
        page,
        site,
        webSetting,
        redirect,
    };

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    AppStore.getInstance<PageProps, WebSettingsProps>(app);

    return (
        <>
            <Head site={site} page={page} />

            <Layout>
                <Navbar />
                {page?.content && <Blocks blocksData={page.content} initialProps={blocksPropsMap} app={app} />}
            </Layout>

            {gtm.code && (
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtm.code}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        <!-- End Google Tag Manager (noscript) -->`,
                    }}
                />
            )}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.locale || context.defaultLocale;
    const { tz } = symbio;
    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    try {
        return await getBlocksProps(
            { ...context, params: { ...context.params, slug: ['404'] } },
            providers,
            blocks,
            symbio.ssg,
        );
    } catch (e) {
        return {
            props: {},
            notFound: true,
        };
    }
};

export default Page;
