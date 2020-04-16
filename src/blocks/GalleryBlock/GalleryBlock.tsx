import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Gallery } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './GalleryBlock.module.scss';

graphql`
    fragment GalleryBlock_content on GalleryRecord {
        assets {
            alt
            url
            width
            height
            id
        }
    }
`;

function GalleryBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { assets } = content;

    return (
        <BlockWrapper tooltip={'GalleryBlock'} className={styles.wrapper} {...rest}>
            <Gallery images={assets} />
        </BlockWrapper>
    );
}

BlockFactory.set('GalleryBlock', GalleryBlock);
