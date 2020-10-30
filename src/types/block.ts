import { IncomingMessage, ServerResponse } from 'http';
import { NextComponentType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { BlockWrapperProps } from '../components/base/BlockWrapper/BlockWrapper';
import { ImageInterface } from './app';
import { Providers } from './provider';

export interface BaseBlockProps extends Omit<BlockWrapperProps, 'tooltip'> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
}

export interface StaticBlockContext {
    params?: ParsedUrlQuery;
    preview?: boolean;
    previewData?: any;
    locale?: string;
    page?: {
        readonly id: unknown;
        readonly url: string | null;
        readonly title: string | null;
    } | null;
    block?: any;
    providers: Providers;
}

export interface ServerSideBlockContext extends StaticBlockContext {
    req: IncomingMessage;
    res: ServerResponse;
    basePath: string;
}

export type BlockGetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (context: ServerSideBlockContext) => Promise<P>;

export type BlockGetStaticProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (ctx: StaticBlockContext) => Promise<P>;

export type BlockGetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (
    locale: string,
    providers: Providers,
) => Promise<P[]>;

export declare type BlockType = NextComponentType<ServerSideBlockContext, any, any> & {
    getStaticProps?: BlockGetStaticProps;
    getStaticPaths?: BlockGetStaticPaths;
};
