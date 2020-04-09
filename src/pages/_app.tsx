import React from 'react';
import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import App, { AppContext } from 'next/app';
import Head from 'next/head';

import { Logger } from '../services';
import { basicAuth } from '../lib/auth/basicAuth';
import symbio from '../../symbio.config';

export default class MyApp extends App {
    public static async getInitialProps(ctx: AppContext): Promise<AppInitialProps> {
        Logger.log('_app getInitialProps');

        symbio.auth.basic && !basicAuth(ctx.ctx.req, ctx.ctx.res);

        return await super.getInitialProps(ctx);
    }

    public render(): JSX.Element {
        const { Component, pageProps } = this.props;

        return (
            <>
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
            </>
        );
    }
}
