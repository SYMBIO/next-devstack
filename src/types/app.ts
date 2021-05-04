import { ResponsiveImageType } from 'react-datocms';
import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';

export type AppData = appQueryResponse;

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
    hostname: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksProps?: any;
    preview?: boolean;
}

type WebSetting = Exclude<appQueryResponse['webSetting'], null>;

export type MainMenu = WebSetting['mainMenu'];

export interface Page {
    url: string | null;
    title?: string | null;
    id?: unknown;
}

export interface ImageInterface {
    readonly id: number;
    readonly url: string;
    readonly width: number | null;
    readonly height: number | null;
    readonly alt: string | null;
    readonly title: string | null;
}

export interface VideoInterface {
    readonly id: number;
    readonly width: number | null;
    readonly height: number | null;
    readonly video: {
        readonly streamingUrl: string;
        readonly thumbnailUrl: string;
    } | null;
}

export type OMIT_REFTYPE<T> = Omit<T, ' $refType'>;
