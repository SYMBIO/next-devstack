import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { BaseBlockProps } from '../../types/block';
import styles from './ImageBlock.module.scss';
import { Image } from '../../components/primitives/Image/Image';

graphql`
    fragment ImageBlock_content on ImageBlockRecord {
        id
        image {
            ...appImageFragment @relay(mask: false)
        }
    }
`;

function ImageBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { image } = content;

    if (!image.responsiveImage) {
        return <></>;
    }

    return (
        <BlockWrapper tooltip={'ImageBlock'} className={styles.wrapper} {...rest}>
            <Image data={image.responsiveImage} />
        </BlockWrapper>
    );
}

ImageBlock.whyDidYouRender = true;

export default ImageBlock;
