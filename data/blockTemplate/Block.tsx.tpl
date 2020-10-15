import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import condCls from '../../utils/conditionalClasses';
import styles from './{NAME}.module.scss';
import { {NAME}_content } from './__generated__/{NAME}_content.graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ServerProps {}

type {NAME}Props = ServerProps & {
    content: {NAME}_content;
    className?: string
};

graphql`
    fragment {NAME}_content on {NAME}Record {
        id
{FIELDS}
    }
`;

function {NAME}({ content, className, ...rest }: {NAME}Props): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'{NAME}'} className={condCls(styles.wrapper, className)} {...rest}>
            <div>{NAME}: {JSON.stringify(content)}</div>
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths
    /*
    {NAME}.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext): Promise<ServerProps> => {
        const provider = providers.x;

        return {};
    };
    */
}

{NAME}.whyDidYouRender = true;

BlockRegistry.set('{NAME}', {NAME});
