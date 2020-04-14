import { NextPageContext } from 'next';
import React, { ReactNode } from 'react';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import { SiteLocale } from '../types/graphql';
import { MyPageProps } from '../types/app';
import symbio from '../../symbio.config';
import DefaultPage from './[...slug]';

function LocaleRedirect({ locale }: MyPageProps): ReactNode {
    return <script dangerouslySetInnerHTML={{ __html: `document.location = '/${locale}';` }}></script>;
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

const Page = symbio.i18n.useLocaleInPath ? LocaleRedirect : DefaultPage;

export default Page;
