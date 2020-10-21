import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { BaseBlockProps } from '../../types/block';
import condCls from '../../utils/conditionalClasses';
import styles from './ButtonBlock.module.scss';
import { ButtonBlock_content } from './__generated__/ButtonBlock_content.graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ServerProps {}

type ButtonBlockProps = ServerProps & {
    content: ButtonBlock_content;
    className?: string;
};

graphql`
    fragment ButtonBlock_content on ButtonBlockRecord {
        id
        file {
            id
            size
            title
            url
        }
        icon {
            id
        }
        page {
            id
        }
        label
    }
`;

function ButtonBlock({ content, className, ...rest }: ButtonBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'ButtonBlock'} className={condCls(styles.wrapper, className)} {...rest}>
            <div>ButtonBlock: {JSON.stringify(content)}</div>
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths
    /*
    ButtonBlock.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext): Promise<ServerProps> => {
        const provider = providers.x;

        return {};
    };
    */
}

ButtonBlock.whyDidYouRender = true;

export default ButtonBlock;
