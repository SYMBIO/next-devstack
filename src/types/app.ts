import { NextPageContext } from 'next';
import { Environment } from 'relay-runtime';
import { Record } from 'relay-runtime/lib/store/RelayStoreTypes';
import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';
import { Maybe, PageModelContentField, SiteLocale } from './graphql';

export interface AppData extends appQueryResponse {
    blocksData: Maybe<Array<Maybe<PageModelContentField>>>;
    relayRecords?: { [key: string]: Record };
}

export type BaseDatoCMSProps =
    | '_createdAt'
    | '_firstPublishedAt'
    | '_isValid'
    | '_modelApiKey'
    | '_publicationScheduledAt'
    | '_publishedAt'
    | '_seoMetaTags'
    | '_status'
    | '_updatedAt'
    | 'createdAt'
    | 'updatedAt';

export interface MyPageContext extends NextPageContext {
    environment?: Environment;
}

export interface MyPageProps extends AppData {
    locale: SiteLocale;
    currentUrl: string;
    hostname: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksInitialProps?: any;
}

type WebSetting = Exclude<appQueryResponse['webSetting'], null>;

export type MainMenu = WebSetting['mainMenu'];

export interface Page {
    url: string | null;
    title?: string | null;
}
