import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { ReactElement, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { CALENDAR_FORMATS } from '../constants';
import providers from '../providers';
import blocks from '../blocks';
import { MyPageProps } from '../types/app';
import { AppContext } from '../utils/app-context/AppContext';
import { trackPage } from '../utils/gtm';
import { gtm, i18n, tz } from '../../symbio.config.json';
import isStaging from '../utils/isStaging';
import { getBlocksProps } from '../lib/blocks/getBlockProps';
import { Head } from '../components/base/Head/Head';
import { EditPage } from '../components/primitives/EditPage/EditPage';
import { Layout } from '../components/base/Layout/Layout';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { Blocks } from '../components/base/Blocks/Blocks';
// import { ParsedUrlQuery } from 'querystring';

const Page = (props: MyPageProps): ReactElement => {
    const { hostname, site, page, blocksData, locale, webSetting, blocksProps } = props;

    const router = useRouter();
    const currentUrl =
        '/' + (router.locale === router.defaultLocale ? '' : router.locale) + router.asPath !== '/'
            ? router.asPath
            : '';

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    dayjs.locale(locale);
    dayjs.tz.setDefault(tz);

    useEffect(() => {
        trackPage(currentUrl);
    }, []);

    return (
        <AppContext.Provider
            value={{
                locale,
                currentUrl,
                hostname,
                page,
                site,
                absoluteLinks: false,
                ...webSetting,
            }}
        >
            {page && <Head page={page} site={site} />}

            {isStaging() && page && <EditPage page={page} />}

            <Layout>
                <Navbar />
                <Blocks blocksData={blocksData} initialProps={blocksProps} />
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
        </AppContext.Provider>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: GetStaticPathsResult['paths'] = [];
    const provider = providers.page;

    // loop over all locales
    for (const locale of i18n.locales) {
        const localePaths = await provider.getStaticPaths(locale);
        paths.push(...localePaths);
    }

    return {
        paths,
        fallback: false,
    };

    /*return {
        paths: [],
        fallback: 'unstable_blocking',
    };*/
};

export const getStaticProps: GetStaticProps = async (context) => {
    // console.log('context', context);

    const locale = context.locale || i18n.defaultLocale;

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    dayjs.locale(locale);
    dayjs.tz.setDefault(tz);

    return await getBlocksProps(context, providers, blocks);
};

export default Page;
