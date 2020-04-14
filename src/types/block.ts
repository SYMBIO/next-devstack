import { BlockWrapperProps } from '../components/BlockWrapper/BlockWrapper';
import { MyPageContext } from './app';
import { SiteLocale } from './graphql';

export interface BaseBlockProps extends BlockWrapperProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
}

export interface BlockContext extends MyPageContext {
    locale: SiteLocale;
}
