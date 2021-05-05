import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Image } from '../../components/primitives/Image/Image';
import { ImageBlock_content } from './__generated__/ImageBlock_content.graphql';
import styles from './ImageBlock.module.scss';

interface ImageBlockProps {
    content: ImageBlock_content;
}

graphql`
    fragment ImageBlock_content on ImageBlockRecord {
        id
        image {
            ...appImageBaseFragment @relay(mask: false)
        }
    }
`;

function ImageBlock({ content }: ImageBlockProps): ReactElement | null {
    const { image } = content;

    if (image) {
        return (
            <BlockWrapper tooltip={'ImageBlock'}>
                <div className={styles.imageWrapper}>
                    <Image image={image} />
                </div>
            </BlockWrapper>
        );
    }

    return null;
}

ImageBlock.whyDidYouRender = true;

export default ImageBlock;
