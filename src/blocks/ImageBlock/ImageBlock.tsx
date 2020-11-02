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

    return (
        <BlockWrapper tooltip={'ImageBlock'} className={styles.wrapper} {...rest}>
            <div
                className={styles.imageWrapper}
                style={{ width: '100%', height: 100 * (image.height / image.width) + '%' }}
            >
                <Image image={image} />
            </div>
        </BlockWrapper>
    );
}

ImageBlock.whyDidYouRender = true;

export default ImageBlock;
