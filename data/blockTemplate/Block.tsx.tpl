import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import condCls from '../../utils/conditionalClasses';
import styles from './{NAME}.module.scss';

interface ServerProps {
}

type {NAME}Props = ServerProps & {
    // eslint-disable-next-line @typescript-eslint/camelcase
    content: {NAME}_content;
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
