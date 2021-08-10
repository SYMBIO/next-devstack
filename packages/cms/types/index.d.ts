import { AbstractProvider, AbstractSingletonProvider } from '../providers';
import { findProvider } from '../utils';

export type ItemId = string;

export type FindOneParams = {
    id: ItemId;
    locale?: string;
    preview?: boolean;
};

export type FindParams<T = Record<string, unknown>> = {
    locale?: string;
    preview?: boolean;
} & Omit<T, 'id'>;

export type ItemStatus = 'draft' | 'updated' | 'published';

export type BaseRecord =
    | ({
          id: string;
      } & Record<string, unknown>)
    | null;

export type SingletonBaseRecord = Record<string, unknown> | null;

export type CmsAttributes = {
    cmsTypeId: string;
    status?: ItemStatus;
};

export type CmsItem<T = BaseRecord> = T & CmsAttributes;

export interface FindResponse<T> {
    count: number;
    data: ReadonlyArray<CmsItem<T>>;
}

export interface ProviderOptions {
    locales: string[];
    apiKey: string;
    id: string;
}

export interface Provider {
    getId: () => string;
    getApiKey: () => string;
    getStaticPaths: (locale: string, blocks?: Record<string, any>) => any;
    find: (params: Record<string, any>) => any;
    findOne: (options: FindOneParams | FindParams) => any;
    getPageBySlug: (
        locale: string | undefined,
        slug: string[],
        preview?: boolean,
    ) => any;
}

export interface PageProvider<P extends BasePage, W> extends Provider {
    getPageBySlug: (
        locale: string | undefined,
        slug: string[],
        preview?: boolean,
    ) => Promise<AppData<P, W> | undefined>;
}

// export type Providers<P extends BasePage, W> = { page: PageProvider<P, W> } & Record<string, Provider>;
export type Providers<P extends BasePage, W> = Record<string, Provider>;

export type AppData<P extends BasePage, W> = {
    site: Site;
    page: P | null;
    redirect: Redirect;
    webSetting: W;
};

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
    id: string;
    url: string | null;
    title?: string | null;
    content?: ReadonlyArray<{ __typename: string; id?: string } | null> | null;
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

export { AbstractProvider, AbstractSingletonProvider, findProvider };
