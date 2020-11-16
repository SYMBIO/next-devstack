import React, { ReactElement, useContext } from 'react';
import NextHead from 'next/head';
import { renderMetaTags } from 'react-datocms';
import { SeoMetaTagType } from 'react-datocms/dist/Seo';
import symbio from '../../../../symbio.config.json';
import { AppContext } from '../../../contexts/app-context/AppContext';

export const Head = (): ReactElement => {
    const { item, page, site } = useContext(AppContext);

    const metaTags: SeoMetaTagType[] = (item?._seoMetaTags || page?._seoMetaTags || []).concat(
        site?.faviconMetaTags || [],
    ) as SeoMetaTagType[];

    return (
        <NextHead>
            {renderMetaTags(metaTags)}

            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />

            {/* APP */}
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#00aba9" />
            <meta name="theme-color" content="#61279e" />
            {site?.globalSeo?.siteName && <meta name="application-name" content={site.globalSeo.siteName} />}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            {site?.globalSeo?.siteName && <meta name="apple-mobile-web-app-title" content={site.globalSeo.siteName} />}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* GTM */}
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
