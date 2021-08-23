import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import styles from './RichTextBlock.module.scss';
import { RichText } from '../../components/primitives/RichText/RichText';
import { RichTextBlock_content } from './__generated__/RichTextBlock_content.graphql';

export interface RichTextBlockProps {
    content: RichTextBlock_content;
}

graphql`
    fragment RichTextBlock_content on RichTextBlockRecord {
        id
        text
    }
`;

function RichTextBlock({ content, ...rest }: RichTextBlockProps): ReactElement<RichTextBlockProps, 'BaseBlock'> {
    const { text } = content;

    if (!text) {
        return <></>;
    }

    return (
        <BlockWrapper tooltip={'RichTextBlock'} className={`block ${styles.wrapper}`} {...rest}>
            <RichText content={text} />
        </BlockWrapper>
    );
}

RichTextBlock.whyDidYouRender = true;

export default RichTextBlock;
