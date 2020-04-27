import { NextPageContext } from 'next';
import React, { ReactNode } from 'react';
import { MyPageProps } from '../../types/app';
import { SiteLocale } from '../../types/graphql';
import { getSiteLocale } from './getSiteLocale';

function LocaleRedirect({ locale }: MyPageProps): ReactNode {
    return <script dangerouslySetInnerHTML={{ __html: `document.location = '/${locale}';` }} />;
}

LocaleRedirect.getInitialProps = function ({ res }: NextPageContext): { locale: SiteLocale } {
    const locale: SiteLocale = getSiteLocale();

    if (res) {
        res.statusCode = 302;
        res.setHeader('Location', '/' + locale);
        res.end(`<script>document.location.href = '/${locale}'`);
    }

    return {
        locale,
    };
};

export default LocaleRedirect;
