import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/cs';
import { ReactRelayContext } from 'react-relay';

import { CALENDAR_FORMATS } from '../constants';
import '../blocks';
import { Blocks, EditPage, Head, Layout, Navbar } from '../components';
import { createRelayEnvironment } from '../lib/relay/createRelayEnvironment';
import { MyPageProps } from '../types/app';
import { AppContext } from '../utils/app-context/AppContext';
import { trackPage } from '../utils/gtm';
import symbio from '../../symbio.config';
import isStaging from '../utils/isStaging';

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

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });

    const environment = createRelayEnvironment(relayRecords, false);

    if (!page || !webSetting) {
        return <>No page</>;
    }

    useEffect(() => {
        trackPage(currentUrl);
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
                    <Blocks blocks={blocksData} initialProps={blocksInitialProps} />
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

// Static-site Generation (static) vs Server side generation (dynamic)
export * from '../lib/server/static';

export default Page;
