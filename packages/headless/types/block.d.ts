import { IncomingMessage, ServerResponse } from 'http';
import { GetStaticPropsContext, NextComponentType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { BasePage, Providers } from '@symbio/cms';

export type BlocksPropsPromisesMap = Record<string, Promise<unknown>>;
export type BlocksPropsMap = Record<string, unknown>;

export interface StaticBlockContext<P extends BasePage, W> {
    locale: string | undefined;
    page?: BasePage;
    block?: BasePage['content'][number];
    providers: Providers<P, W>;
    blocks: Record<string, BlockType<P, W>>;
    context: GetStaticPropsContext;
}

export interface ServerSideBlockContext<P extends BasePage, W> extends StaticBlockContext<P, W> {
    req: IncomingMessage;
    res: ServerResponse;
    basePath: string;
}

export type BlockGetServerSideProps<
    Page extends BasePage,
    W,
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (context: ServerSideBlockContext<Page, W>) => Promise<P>;

export type BlockGetStaticProps<
    Page extends BasePage,
    W,
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (ctx: StaticBlockContext<Page, W>) => Promise<P>;

export type BlockGetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (
    locale: string | undefined,
    providers: Providers<any, any>,
) => Promise<P[]>;

export declare type BlockType<P extends BasePage, W> = NextComponentType<ServerSideBlockContext<P, W>, any, any> & {
    getStaticProps?: BlockGetStaticProps<P, W>;
    getStaticPaths?: BlockGetStaticPaths;
};
