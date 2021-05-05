import PageProvider from '../lib/provider/PageProvider';
import Provider from '../lib/provider/Provider';
import { BlocksPropsMap } from './block';

export type OmitRefType<T> = Omit<T, ' $refType'>;

export type AppData<P extends BasePage, W> = {
    site: Site;
    page: P;
    redirect: Redirect;
    webSetting: W;
};

export interface MyPageProps<P extends BasePage, W> extends AppData<P, W> {
    hostname: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocksPropsMap?: BlocksPropsMap;
    preview?: boolean;
    showGrid?: boolean;
}

export interface Site {
    readonly globalSeo: {
        readonly siteName: string | null;
        readonly titleSuffix: string | null;
        readonly facebookPageUrl: string | null;
        readonly fallbackSeo: {
            readonly description: string | null;
            readonly title: string | null;
            readonly image: {
                readonly url: string;
            } | null;
            readonly twitterCard: string | null;
        } | null;
        readonly twitterAccount: string | null;
    } | null;
    readonly favicon: {
        readonly url: string;
    } | null;
    readonly faviconMetaTags: ReadonlyArray<{
        readonly tag: string;
        readonly attributes: unknown | null;
        readonly content: string | null;
    }>;
}

export type Redirect = {
    readonly id: string;
    readonly from: string | null;
    readonly to: string | null;
    readonly permanent: boolean | null;
} | null;

export interface BasePage {
    url: string | null;
    title?: string | null;
    content: { __typename: string; id: string }[];
}

export interface ImageInterface {
    readonly url: string;
    readonly width: number | null;
    readonly height: number | null;
    readonly alt?: string | null;
    readonly title?: string | null;
    readonly focalPoint?: {
        readonly x: number | null;
        readonly y: number | null;
    } | null;
}

export interface VideoInterface {
    readonly id: string;
    readonly width: number | null;
    readonly height: number | null;
    readonly video: {
        readonly streamingUrl: string;
        readonly thumbnailUrl: string;
    } | null;
}

export type Route<ObjectType> = {
    readonly id?: string;
    readonly label?: string | null;
    readonly title: string | null;
    readonly object?: ObjectType;
    readonly file?: {
        readonly url: string;
    } | null;
    readonly url?: string | null;
    readonly isTargetBlank?: boolean | null;
    readonly parameters?: string | null;
};

export type IndexingRelations = Record<string, Record<string, Array<string>>>;

export type Providers<P extends BasePage, W> = { page: PageProvider<P, W> } & Record<string, Provider>;
