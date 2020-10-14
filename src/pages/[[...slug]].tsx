import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/cs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CALENDAR_FORMATS } from '../constants';
import '../blocks';
import providers from '../providers';
import { Blocks, EditPage, Head, Layout, Navbar } from '../components';
import { MyPageProps } from '../types/app';
import { AppContext } from '../utils/app-context/AppContext';
import { trackPage } from '../utils/gtm';
import { cache, gtm, i18n, tz } from '../../symbio.config.json';
import isStaging from '../utils/isStaging';
import { getBlocksProps } from '../lib/blocks/getBlockProps';
// import { ParsedUrlQuery } from 'querystring';

const Page = (props: MyPageProps): ReactElement => {
    const { currentUrl, hostname, site, page, blocksData, locale, webSetting, blocksProps } = props;

    const router = useRouter();

    if (props.forcePreview) {
        return (
            <>
                <span
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        lineHeight: '50vh',
                    }}
                >
                    Loading preview mode...
                </span>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.setTimeout(function() {
    document.location = '/api/preview?locale=${locale}&target=${encodeURIComponent(currentUrl)}';
}, 1000)`,
                    }}
                />
            </>
        );
    }

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    moment.locale(locale);
    moment.tz.setDefault(tz);

    useEffect(() => {
        trackPage(currentUrl);
    }, [currentUrl]);

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
                <Blocks blocks={blocksData} initialProps={blocksProps} />
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
    // const paths: Array<string | { params: ParsedUrlQuery }> = [];
    // const provider = providers.page;
    //
    // // loop over all locales
    // for (const locale of locales) {
    //     const localePaths = await provider.getStaticPaths(locale);
    //     paths.push(...localePaths.map((lp) => ({ params: lp })));
    // }
    //
    // console.log(JSON.stringify(paths));
    //
    // return {
    //     paths,
    //     fallback: false,
    // };

    return {
        paths: [],
        fallback: 'unstable_blocking',
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params, locales } = context;

    console.log('context', context);

    let locale = context.locale;

    if (!locale) {
        locale = 'cs';
    }

    moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    moment.locale(locale);
    moment.tz.setDefault(tz);

    let pathParts = params?.slug?.slice(i18n.useLocaleInPath ? 1 : 0);

    console.log('pathparts first', pathParts);

    if (locales?.indexOf(locale) === -1) {
        locale = locales[0];
        pathParts = ['404'];
    }

    const currentUrl =
        typeof pathParts !== 'undefined' ? (typeof pathParts === 'string' ? pathParts : pathParts.join('/')) : '';

    // redirect to preview mode
    if (isStaging() && !context.preview) {
        return {
            props: {
                locale,
                forcePreview: true,
                currentUrl,
            },
            revalidate: 1,
        };
    }

    console.log('pathparts', pathParts);

    if (pathParts) {
        return await getBlocksProps(context, locale, pathParts, providers, currentUrl);
    }

    return {
        props: {
            locale,
            currentUrl,
        },
        revalidate: isStaging() ? 1 : cache.maxAge,
    };
};

export default Page;
