import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, RichText } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './RichTextBlock.module.scss';

graphql`
    fragment RichTextBlock_content on RichTextBlockRecord {
        id
        text
    }
`;

function RichTextBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { text } = content;

    return (
        <BlockWrapper tooltip={'RichTextBlock'} className={styles.wrapper} {...rest}>
            <RichText content={text} />
        </BlockWrapper>
    );
}

BlockRegistry.set('RichTextBlock', RichTextBlock);
