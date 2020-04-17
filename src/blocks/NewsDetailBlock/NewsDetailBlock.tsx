import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './NewsDetailBlock.module.scss';

graphql`
    fragment NewsDetailBlock_content on NewsDetailRecord {
        id
    }
`;

function NewsDetailBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'NewsDetailBlock'} className={styles.wrapper} {...rest}>
            <div>NewsDetail: {JSON.stringify(content)}</div>
        </BlockWrapper>
    );
}

BlockFactory.set('NewsDetailBlock', NewsDetailBlock);
