import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './{NAME}Block.module.scss';

graphql`
    fragment {NAME}Block_content on {NAME}Record {
        id
{FIELDS}
    }
`;

function {NAME}Block({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'{NAME}Block'} className={styles.wrapper} {...rest}>
            <div>{NAME}: {JSON.stringify(content)}</div>
        </BlockWrapper>
    );
}

BlockFactory.set('{NAME}', {NAME}Block);
