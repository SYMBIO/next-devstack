import { NextPageContext } from 'next';
import { Environment } from 'relay-runtime';
import { Record } from 'relay-runtime/lib/store/RelayStoreTypes';
import { SlugAppQueryResponse } from '../relay/api/__generated__/SlugAppQuery.graphql';
import { Maybe, PageModelContentField, SiteLocale } from './graphql';

export interface AppData extends SlugAppQueryResponse {
    blocksData: Maybe<Array<Maybe<PageModelContentField>>>;
    relayRecords: { [key: string]: Record };
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
    relayData?: any;
}

type WebSetting = Exclude<SlugAppQueryResponse['webSetting'], null>;

export type MainMenu = WebSetting['mainMenu'];

export interface Page {
    url: string | null;
    title?: string | null;
}
