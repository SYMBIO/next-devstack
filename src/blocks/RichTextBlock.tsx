import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { useFragment } from 'relay-hooks/lib';
import { BlockWrapper } from '../components/BlockWrapper/BlockWrapper';
import { RichText } from '../components/RichText/RichText';
import { BaseBlockProps } from '../types/block';

interface RichTextBlockProps extends BaseBlockProps {
    text: string;
}

export default function RichTextBlock({
    content,
    ...rest
}: RichTextBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { text } = useFragment(
        graphql`
            fragment RichTextBlock_content on RichTextRecord {
                id
                text
            }
        `,
        content,
    );

    return (
        <BlockWrapper {...rest}>
            <RichText content={text} />
        </BlockWrapper>
    );
}
