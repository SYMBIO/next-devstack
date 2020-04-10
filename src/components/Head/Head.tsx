import React, { ReactElement } from 'react';
import NextHead from 'next/head';
import symbio from '../../../symbio.config';
import { SlugAppQueryResponse } from '../../relay/api/__generated__/SlugAppQuery.graphql';

interface HeadProps {
    page: SlugAppQueryResponse['page'];
    site: SlugAppQueryResponse['site'];
}

export const Head = ({ page, site }: HeadProps): ReactElement => (
    <NextHead>
        <title>
            {page && page.title}
            {site && site.globalSeo && site.globalSeo.titleSuffix}
        </title>
        <link rel="icon" type="image/x-icon" href={site.favicon?.url + '?w='} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {site.faviconMetaTags.map((favicon, i) => {
            const { tag: Tag, attributes } = favicon;
            return <Tag key={`Favicon_${i}`} {...attributes} />;
        })}
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
