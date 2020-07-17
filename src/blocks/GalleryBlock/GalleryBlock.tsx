import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Gallery } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import { GalleryBlock_content } from './__generated__/GalleryBlock_content.graphql';
import styles from './GalleryBlock.module.scss';

graphql`
    fragment GalleryBlock_content on GalleryBlockRecord {
        assets {
            ...appImageBaseFragment @relay(mask: false)
            responsiveImage(imgixParams: { fit: crop, w: 300 }) {
                ...appResponsiveImageFragment @relay(mask: false)
            }
        }
    }
`;

function GalleryBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { assets }: GalleryBlock_content = content;

    return (
        <BlockWrapper tooltip={'GalleryBlock'} className={styles.wrapper} {...rest}>
            <Gallery images={assets} />
        </BlockWrapper>
    );
}

BlockRegistry.set('GalleryBlock', GalleryBlock);
