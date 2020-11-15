import React, { ReactElement, useContext } from 'react';
import NextHead from 'next/head';
import symbio from '../../../../symbio.config.json';
import { AppContext } from '../../../contexts/app-context/AppContext';

export const Head = (): ReactElement => {
    const { page, site } = useContext(AppContext);

    return (
        <NextHead>
            {page?.title && (
                <title>
                    {page.title}
                    {site?.globalSeo?.titleSuffix}
                </title>
            )}
            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="msapplication-TileColor" content="#00aba9" />
            <meta name="theme-color" content="#61279e" />
            {site?.globalSeo?.siteName && <meta name="application-name" content={site.globalSeo.siteName} />}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {site?.globalSeo?.siteName && <meta name="apple-mobile-web-app-title" content={site.globalSeo.siteName} />}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
            <meta name="msapplication-config" content="/browserconfig.xml" />
            {site && <link rel="icon" href={site.favicon?.url} />}
            {site && <link rel="apple-touch-icon" href={site.favicon?.url} />}
            {site?.faviconMetaTags.map((favicon, i) => {
                const { tag: Tag, attributes } = favicon;
                return <Tag key={`Favicon_${i}`} {...attributes} />;
            })}
            {site?.globalSeo?.siteName && <meta property="og:site_name" content={site.globalSeo?.siteName} />}
            <meta
                name="description"
                content={String(page?.metaTags?.description || site?.globalSeo?.fallbackSeo?.description || '')}
            />

            {site?.globalSeo?.twitterAccount && <meta name="twitter:site" content={site.globalSeo?.twitterAccount} />}
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
};
