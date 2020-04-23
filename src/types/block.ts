import { IncomingMessage, ServerResponse } from 'http';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextComponentType } from 'next';
import { BaseContext } from 'next/dist/next-server/lib/utils';
import { ParsedUrlQuery } from 'querystring';
import { ComponentType } from 'react';
import { Environment } from 'relay-runtime';
import { BlockWrapperProps } from '../components/BlockWrapper/BlockWrapper';
import { SiteLocale } from './graphql';

export interface BaseBlockProps extends Omit<BlockWrapperProps, 'tooltip'> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
}

export interface StaticBlockContext {
    params?: ParsedUrlQuery;
    preview?: boolean;
    previewData?: any;
    locale: SiteLocale;
    environment: Environment;
}

export interface BlockContext extends StaticBlockContext {
    req: IncomingMessage;
    res: ServerResponse;
}

export type BlockGetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (context: BlockContext) => Promise<P>;

export type BlockGetStaticProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = (ctx: StaticBlockContext) => Promise<P>;

export declare type BlockType = NextComponentType<BlockContext, any, any> & {
    getStaticProps?: BlockGetStaticProps;
    getServerSideProps?: BlockGetServerSideProps;
    getStaticPaths?: GetStaticPaths;
};
