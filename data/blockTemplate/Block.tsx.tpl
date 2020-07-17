import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import condCls from '../../utils/conditionalClasses';
import styles from './{NAME}.module.scss';
import { {NAME}Block_content } from './__generated__/{NAME}Block_content.graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ServerProps {}

type {NAME}Props = ServerProps & {
    content: {NAME}Block_content;
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
    // put your getStaticProps, getStaticPaths or getServerProps here
    /*
    {NAME}.getStaticProps = {NAME}.getServerSideProps = async ({
        locale,
    }: StaticBlockContext): Promise<ServerProps> => {
        const provider = ProviderRegistry.get('x') as xProvider;
        if (!provider) {
            throw new Error('Provider x not found');
        }

        return {};
    };
    */
}

BlockRegistry.set('{NAME}', {NAME});
