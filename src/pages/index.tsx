import React, { ReactNode } from 'react';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import { SiteLocale } from '../types/graphql';
import { MyPageProps } from '../types/page';

export default function Page({ locale }: MyPageProps): ReactNode {
    return <script dangerouslySetInnerHTML={{ __html: `document.location = '/${locale}';` }} />;
}

Page.getInitialProps = function (): { locale: SiteLocale } {
    const locale: SiteLocale = getSiteLocale();

    return {
        locale,
    };
};
