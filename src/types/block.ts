import { BlockWrapperProps } from '../components/BlockWrapper/BlockWrapper';
import { PageModelContentField } from './graphql';

export interface BaseBlockProps extends BlockWrapperProps {
    content: any;
}
