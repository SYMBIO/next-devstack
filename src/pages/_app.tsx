import React from 'react';
import { Environment, ReactRelayContext } from 'react-relay';
import { Record } from 'relay-runtime/lib/store/RelayStoreTypes';
import { isRelayModernEnvironment } from 'relay-runtime';
import { NextComponentType } from 'next';
import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import { Logger } from '../services';
import { basicAuth } from '../lib/auth/basicAuth';
import { createRelayEnvironment } from '../lib/relay/createRelayEnvironment';
import symbio from '../../symbio.config';
import { MyPageContext } from '../types/page';

interface MyAppInitialProps extends AppInitialProps {
    environment: Environment;
    relayRecords?: { [key: string]: Record };
}

interface MyAppContext extends AppContext {
    Component: NextComponentType<MyPageContext>;
    ctx: MyPageContext;
    environment?: Environment;
}

type MyAppProps = AppProps & MyAppInitialProps;

export default class MyApp extends App<MyAppProps> {
    public static async getInitialProps({ Component, ctx }: MyAppContext): Promise<MyAppInitialProps> {
        Logger.log('_app getInitialProps');

        const environment = createRelayEnvironment({}, true);

        symbio.auth.basic && !basicAuth(ctx.req, ctx.res);

        if (Component.getInitialProps) {
            return {
                pageProps: Component.getInitialProps({ ...ctx, environment }),
                environment,
            };
        }

        return {
            pageProps: {},
            environment,
        };
    }

    public render(): JSX.Element {
        const { Component, pageProps, environment, relayRecords } = this.props;

        return (
            <ReactRelayContext.Provider
                value={{
                    environment: isRelayModernEnvironment(environment)
                        ? environment
                        : createRelayEnvironment(relayRecords, false),
                }}
            >
                <Head>
                    <title>SYMBIO devstack</title>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KRM3STK');
            `,
                        }}
                    />
                </Head>

                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KRM3STK" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        <!-- End Google Tag Manager (noscript) -->`,
                    }}
                />
                <Component {...pageProps} />
            </ReactRelayContext.Provider>
        );
    }
}
