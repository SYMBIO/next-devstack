import dayjs from 'dayjs';
import timeZone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { gtm, tz } from '../../symbio.config.json';
import blocks from '../blocks/server';
import { Blocks } from '../components/base/Blocks/Blocks';
import { Head } from '../components/base/Head/Head';
import { Layout } from '../components/base/Layout/Layout';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { CALENDAR_FORMATS } from '../constants';
import { ContextsProvider } from '../contexts';
import providers from '../providers';
import { MyPageProps } from '../types/app';
import { trackPage } from '../utils/gtm';
import { getPageStaticProps } from '../lib/blocks/getPageStaticProps';

const Page = (props: MyPageProps): ReactElement => {
    const { hostname, site, page, webSetting, blocksProps } = props;
    const router = useRouter();
    const locale = router.locale || router.defaultLocale;
    const currentUrl =
        '/' + (router.locale === router.defaultLocale ? '' : router.locale) + router.asPath !== '/'
            ? router.asPath
            : '';

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

    useEffect(() => {
        trackPage(currentUrl);
    }, []);

    return (
        <ContextsProvider.Provider
            value={{
                appContext: {
                    currentUrl,
                    hostname,
                    page,
                    site,
                    absoluteLinks: false,
                    ...webSetting,
                },
            }}
        >
            <Head />

            <Layout>
                <Navbar />
                {page?.content && <Blocks blocksData={page.content} initialProps={blocksProps} />}
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
        </ContextsProvider.Provider>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.locale || context.defaultLocale;

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    try {
        return await getPageStaticProps(
            { ...context, params: { ...context.params, slug: ['404'] } },
            providers,
            blocks,
        );
    } catch (e) {
        return {
            props: {},
            notFound: true,
        };
    }
};

export default Page;
