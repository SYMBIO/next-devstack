import React, { ReactElement, useEffect } from 'react';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timeZone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import blocks from '../blocks/server';
import { Blocks } from '../components/base/Blocks/Blocks';
import { Head } from '../components/base/Head/Head';
import { Layout } from '../components/base/Layout/Layout';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { PreviewToolbarProps } from '../components/primitives/PreviewToolbar/PreviewToolbar';
import { CALENDAR_FORMATS } from '../constants';
import { getBlocksProps } from '../lib/blocks/getBlocksProps';
import providers from '../providers';
import { gtm, ssg, tz } from '../../symbio.config.json';
import { Logger } from '../services';
import { MyPageProps } from '../types/app';
import { trackPage } from '../utils/gtm';
import { ContextsProvider } from '../contexts';

const PreviewToolbar = dynamic<PreviewToolbarProps>(() =>
    import('../components/primitives/PreviewToolbar/PreviewToolbar').then((mod) => mod.PreviewToolbar),
);

const Page = (props: MyPageProps): ReactElement => {
    const { hostname, site, page, webSetting, blocksProps, preview } = props;
    const item = Array.isArray(blocksProps) && blocksProps.length > 0 ? blocksProps[0].item : undefined;
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
    dayjs.extend(localizedFormat);
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
                    item,
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

            {preview && page && <PreviewToolbar page={page} item={item} />}

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
    if (process.env.NODE_ENV !== 'development' && ssg.staticGeneration && locales) {
        const paths: GetStaticPathsResult['paths'] = [];
        const provider = providers.page;

        // loop over all locales
        for (const locale of locales) {
            const localePaths = await provider.getStaticPaths(locale, blocks);
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
    const p = context.params;
    Logger.info('GET ' + '/' + (p && Array.isArray(p.slug) ? p.slug : []).join('/'));

    const locale = context.locale || context.defaultLocale;
    dayjs.extend(updateLocale);
    dayjs.extend(timeZone);
    dayjs.extend(localizedFormat);
    if (locale) {
        dayjs.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
        dayjs.locale(locale);
    }
    dayjs.tz.setDefault(tz);

    return await getBlocksProps(context, providers, blocks);
};

export default Page;
