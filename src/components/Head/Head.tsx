import React, { ReactElement } from 'react';
import NextHead from 'next/head';
import symbio from '../../../symbio.config.json';

interface HeadProps {
    page: { title: string | null };
    site: {
        globalSeo: {
            readonly siteName: string | null;
            readonly titleSuffix: string | null;
            readonly facebookPageUrl: string | null;
            readonly fallbackSeo: {
                readonly description: string | null;
                readonly title: string | null;
                readonly image: {
                    readonly url: string;
                } | null;
                readonly twitterCard: string | null;
            } | null;
            readonly twitterAccount: string | null;
        } | null;
        favicon: { url: string } | null;
        faviconMetaTags: readonly { readonly tag: string; readonly attributes: unknown }[];
    };
}

const APP_NAME = 'Next devstack';

export const Head = ({ page, site }: HeadProps): ReactElement => (
    <NextHead>
        <title>
            {page && page.title}
            {site && site.globalSeo && site.globalSeo.titleSuffix}
        </title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#61279e" />

        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="icon" type="image/x-icon" href={site.favicon?.url + '?w='} />
        {site.faviconMetaTags.map((favicon, i) => {
            const { tag: Tag, attributes } = favicon;
            return <Tag key={`Favicon_${i}`} {...attributes} />;
        })}
        {site.globalSeo?.siteName && <meta property="og:site_name" content={site.globalSeo?.siteName} />}
        {site.globalSeo?.twitterAccount && <meta name="twitter:site" content={site.globalSeo?.twitterAccount} />}
        {symbio.gtm.code && (
            <script
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${symbio.gtm.code}');`,
                }}
            />
        )}
    </NextHead>
);
