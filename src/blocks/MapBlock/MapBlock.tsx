import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './MapBlock.module.scss';

graphql`
    fragment MapBlock_content on MapRecord {
        id
        bubbleText
        gps {
            latitude
            longitude
        }
    }
`;

function MapBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'MapBlock'} className={styles.wrapper} {...rest}>
            <div>Map: {JSON.stringify(content)}</div>
        </BlockWrapper>
    );
}

BlockFactory.set('MapBlock', MapBlock);
