import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/cs';

// import { getStaticProps as gSP, getStaticPaths as gSPaths } from '../lib/server/ssg';
import { getServerSideProps as gSSP } from '../lib/server/ssr';
import { CALENDAR_FORMATS } from '../constants';
import '../blocks';
import '../providers';
import { Blocks, EditPage, Head, Layout, Navbar } from '../components';
import { MyPageProps } from '../types/app';
import { AppContext } from '../utils/app-context/AppContext';
import { trackPage } from '../utils/gtm';
import symbio from '../../symbio.config.json';
import isStaging from '../utils/isStaging';

const Page = (props: MyPageProps): ReactElement => {
    const { currentUrl, hostname, site, page, blocksData, locale, webSetting, blocksProps } = props;

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    moment.locale(locale);
    moment.tz.setDefault(symbio.tz);

    if (!page || !webSetting) {
        return <>No page</>;
    }

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
            <Head page={page} site={site} />

            {isStaging() && <EditPage page={page} />}

            <Layout>
                <Navbar />
                <Blocks blocks={blocksData} initialProps={blocksProps} />
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
    );
};

// Static Site Generation (ssg) vs Server Side Rendering (ssr)
export const getServerSideProps = gSSP;
// export const getStaticProps = gSP;
// export const getStaticPaths = gSPaths;

export default Page;
