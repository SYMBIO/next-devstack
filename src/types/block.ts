import { NextPageContext } from 'next';
import { Environment } from 'relay-runtime';
import { BlockWrapperProps } from '../components/BlockWrapper/BlockWrapper';
import { SiteLocale } from './graphql';

export interface BaseBlockProps extends BlockWrapperProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
}

export interface BlockContext extends NextPageContext {
    locale: SiteLocale;
    environment: Environment;
}
