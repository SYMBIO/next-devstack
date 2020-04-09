import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { useFragment } from 'react-relay/hooks';
import { BaseBlock, BaseBlockProps } from '../components/BaseBlock/BaseBlock';
import { RichText } from '../components/RichText/RichText';

interface RichTextBlockProps extends BaseBlockProps {
    text: string;
}

export const RichTextBlock = ({
    text,
    ...baseBlockProps
}: RichTextBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> => {
    useFragment(
        graphql`
            fragment RichTextBlock_content on RichtextRecord {
                id
                text
            }
        `,
        baseBlockProps.content,
    );

    return (
        <BaseBlock {...baseBlockProps}>
            <RichText content={text} />
        </BaseBlock>
    );
};
