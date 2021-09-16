import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Image } from '../../components/primitives/Image/Image';
import { ImageBlock_content } from './__generated__/ImageBlock_content.graphql';

interface ImageBlockProps {
    content: ImageBlock_content;
}

graphql`
    fragment ImageBlock_content on ImageBlockRecord {
        id
        image {
            ...appImageFragment @relay(mask: false)
        }
    }
`;

function ImageBlock({ content }: ImageBlockProps): ReactElement | null {
    const { image } = content;

    if (image) {
        return (
            <BlockWrapper tooltip={'ImageBlock'}>
                <div className="flex flex-col justify-center items-center">
                    <Image image={image} />
                </div>
            </BlockWrapper>
        );
    }

    return null;
}

ImageBlock.whyDidYouRender = true;

export default ImageBlock;
