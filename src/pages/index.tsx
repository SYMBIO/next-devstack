import React, { ReactNode } from 'react';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import { SiteLocale } from '../types/graphql';
import { MyPageContext, MyPageProps } from '../types/page';

export default function Page({ locale }: MyPageProps): ReactNode {
    return <script dangerouslySetInnerHTML={{ __html: `document.location = '/${locale}';` }} />;
}

Page.getInitialProps = function ({ res }: MyPageContext): { locale: SiteLocale } {
    const locale: SiteLocale = getSiteLocale();

    res?.setHeader('Location', '/' + locale);
    res?.end(`<script>document.location = '/${locale}'`);

    return {
        locale,
    };
};
