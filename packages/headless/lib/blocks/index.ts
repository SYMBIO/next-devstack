import { IncomingMessage, ServerResponse } from 'http';
import { GetStaticPropsContext, NextComponentType, GetStaticPathsResult } from 'next';
import { BasePage } from '@symbio/cms';

export * from './getBlocksProps';
export * from './getStaticParamsFromBlocks';

export type BlocksPropsPromisesMap = Record<string, Promise<unknown>>;
export type BlocksPropsMap = Record<string, unknown>;

export interface StaticBlockContext<Page extends BasePage, WebSettings, Providers, Locale> {
    locale: Locale;
    page?: BasePage;
    block?: NonNullable<Page['content']>[number];
    providers: Providers;
    blocks: Record<string, BlockType<Page, WebSettings, Providers, Locale>>;
    context: GetStaticPropsContext;
    settings: WebSettings;
}

export interface ServerSideBlockContext<Page extends BasePage, WebSettings, Providers, Locale>
    extends StaticBlockContext<Page, WebSettings, Providers, Locale> {
    req: IncomingMessage;
    res: ServerResponse;
    basePath: string;
}

export type BlockGetServerSideProps<
    Page extends BasePage,
    WebSettings,
    Providers,
    Locale,
    Props extends { [key: string]: any } = { [key: string]: any },
> = (context: ServerSideBlockContext<Page, WebSettings, Providers, Locale>) => Promise<Props>;

export type BlockGetStaticProps<
    Page extends BasePage,
    WebSettings,
    Providers,
    Locale,
    Props extends { [key: string]: any } = { [key: string]: any },
> = (ctx: StaticBlockContext<Page, WebSettings, Providers, Locale>) => Promise<Props>;

export type BlockGetStaticPaths<
    Providers,
    Locale,
    Paths extends GetStaticPathsResult['paths'] = GetStaticPathsResult['paths'],
> = (locale: Locale, providers: Providers) => Promise<Paths>;

export declare type BlockType<Page extends BasePage, WebSettings, Providers, Locale> = NextComponentType<
    ServerSideBlockContext<Page, WebSettings, Providers, Locale>,
    any,
    any
> & {
    getStaticProps?: BlockGetStaticProps<Page, WebSettings, Providers, Locale>;
    getStaticPaths?: BlockGetStaticPaths<Providers, Locale>;
};
