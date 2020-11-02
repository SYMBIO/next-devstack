import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Image } from '../../components/primitives/Image/Image';
import { BaseBlockProps } from '../../types/block';
import styles from './ImageBlock.module.scss';

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
            <Image image={image} layout={'fill'} />
        </BlockWrapper>
    );
}

ImageBlock.whyDidYouRender = true;

export default ImageBlock;
