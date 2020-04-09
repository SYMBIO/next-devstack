import { NextPageContext } from 'next/types';
import { WebSettings } from './web-settings';
import { Site } from './site';
import { Environment } from 'relay-runtime';

export interface Page {
    id: string;
    url: string;
    url2?: string;
    title: string;
    parent?: {
        url?: string;
        parent?: {
            url?: string;
        };
    };
}

export interface Redirect {
    to: string;
    httpStatus: number;
}

export interface MyPageContext extends NextPageContext {
    environment?: Environment;
}

export interface MyPageProps extends WebSettings {
    locale: 'cs' | 'en';
    site: Site;
    settings: WebSettings;
    redirect?: Redirect;
    page: Page;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocks?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    relayData?: any;
}
