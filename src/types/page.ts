import { NextPageContext } from 'next/types';
import { Record } from 'relay-runtime/lib/store/RelayStoreTypes';
import { Maybe, PageModelContentField, PageRecord, SiteLocale } from './graphql';
import { WebSettings } from './web-settings';
import { Site } from './site';
import { Environment } from 'relay-runtime';

export interface Redirect {
    to: string;
    httpStatus: number;
}

export interface MyPageContext extends NextPageContext {
    environment?: Environment;
}

export interface MyPageProps extends WebSettings {
    locale: SiteLocale;
    site?: Site;
    settings?: WebSettings;
    redirect?: Redirect;
    page?: PageRecord;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksData?: Maybe<Array<Maybe<PageModelContentField>>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    relayData?: any;
    relayRecords?: { [key: string]: Record };
}
