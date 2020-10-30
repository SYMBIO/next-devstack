import React, { ReactElement, useEffect } from 'react';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import blocks from '../blocks/server';
import { Blocks } from '../components/base/Blocks/Blocks';
import { Head } from '../components/base/Head/Head';
import { Layout } from '../components/base/Layout/Layout';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { PreviewToolbarProps } from '../components/primitives/PreviewToolbar/PreviewToolbar';
import { CALENDAR_FORMATS } from '../constants';
import { getBlocksProps } from '../lib/blocks/getBlocksProps';
import providers from '../providers';
import { gtm, i18n, ssg, tz } from '../../symbio.config.json';
import { MyPageProps } from '../types/app';
import { trackPage } from '../utils/gtm';
import { ContextsProvider } from '../contexts';

const PreviewToolbar = dynamic<PreviewToolbarProps>(() =>
    import('../components/primitives/PreviewToolbar/PreviewToolbar').then((mod) => mod.PreviewToolbar),
);

const Page = (props: MyPageProps): ReactElement => {
    const { hostname, site, page, blocksData, locale, webSetting, blocksProps, preview } = props;

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
        <ContextsProvider.Provider
            value={{
                appContext: {
                    locale,
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

            {preview && page && <PreviewToolbar page={page} />}

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
        </ContextsProvider.Provider>
    );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    if (ssg.staticGeneration && locales) {
        const paths: GetStaticPathsResult['paths'] = [];
        const provider = providers.page;

        // loop over all locales
        for (const locale of locales) {
            const localePaths = await provider.getStaticPaths(locale);
            paths.push(...localePaths);
        }

        return {
            paths,
            fallback: false,
        };
    } else {
        return {
            paths: [],
            fallback: 'blocking',
        };
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.locale || i18n.defaultLocale;

    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    dayjs.locale(locale);
    dayjs.tz.setDefault(tz);

    return await getBlocksProps(context, providers, blocks);
};

export default Page;
