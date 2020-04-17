import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Image } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './ImageBlock.module.scss';

graphql`
    fragment ImageBlock_content on ImageRecord {
        id
        image {
            id
            url
            alt
            width
            height
        }
    }
`;

function ImageBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { image } = content;

    if (!image) {
        return <></>;
    }

    const { url, ...imgRest } = image;

    return (
        <BlockWrapper tooltip={'ImageBlock'} className={styles.wrapper} {...rest}>
            <Image src={url} {...imgRest} />
        </BlockWrapper>
    );
}

BlockFactory.set('ImageBlock', ImageBlock);
