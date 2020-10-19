import { appQueryResponse } from '../relay/__generated__/appQuery.graphql';
import { blocksContent } from '../blocks/__generated__/blocksContent.graphql';

export interface AppData extends appQueryResponse {
    blocksData: ReadonlyArray<Omit<blocksContent, ' $refType'> | null> | null;
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
    locale: string;
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
}

export interface ImageInterface {
    readonly id: number;
    readonly url: string;
    readonly responsiveImage: {
        readonly srcSet: string;
        readonly webpSrcSet: string;
        readonly sizes: string;
        readonly src: string;
        readonly width: number;
        readonly height: number;
        readonly aspectRatio: number;
        readonly alt: string | null;
        readonly title: string | null;
        readonly base64: string | null;
    } | null;
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
