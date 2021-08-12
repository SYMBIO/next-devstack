import { IncomingMessage, ServerResponse } from 'http';
import { GetStaticPropsContext, NextComponentType, GetStaticPathsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { BasePage } from '@symbio/cms';

export type BlocksPropsPromisesMap = Record<string, Promise<unknown>>;
export type BlocksPropsMap = Record<string, unknown>;

export interface StaticBlockContext<P extends BasePage, W, PR, L> {
    locale: L;
    page?: BasePage;
    block?: NonNullable<P['content']>[number];
    providers: PR;
    blocks: Record<string, BlockType<P, W, PR, L>>;
    context: GetStaticPropsContext;
}

export interface ServerSideBlockContext<P extends BasePage, W, PR, L> extends StaticBlockContext<P, W, PR, L> {
    req: IncomingMessage;
    res: ServerResponse;
    basePath: string;
}

export type BlockGetServerSideProps<
    Page extends BasePage,
    W,
    PR,
    L,
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (context: ServerSideBlockContext<Page, W, PR, L>) => Promise<P>;

export type BlockGetStaticProps<
    Page extends BasePage,
    W,
    PR,
    L,
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (ctx: StaticBlockContext<Page, W, PR, L>) => Promise<P>;

export type BlockGetStaticPaths<PR, L, P extends GetStaticPathsResult['paths'] = GetStaticPathsResult['paths']> = (
    locale: L,
    providers: PR,
) => Promise<P>;

export declare type BlockType<P extends BasePage, W, PR, L> = NextComponentType<
    ServerSideBlockContext<P, W, PR, L>,
    any,
    any
> & {
    getStaticProps?: BlockGetStaticProps<P, W, PR, L>;
    getStaticPaths?: BlockGetStaticPaths<PR, L>;
};
