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

export interface ImageInterface {
    readonly id: unknown;
    readonly url: string;
    readonly alt: string | null;
    readonly width: unknown | null;
    readonly height: unknown | null;
}

export interface VideoInterface {
    readonly id: unknown;
    readonly width: unknown | null;
    readonly height: unknown | null;
    readonly video: {
        readonly streamingUrl: string;
        readonly thumbnailUrl: string;
    } | null;
}
