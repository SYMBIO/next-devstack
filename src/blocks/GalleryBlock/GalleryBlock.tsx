import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Gallery } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
// eslint-disable-next-line @typescript-eslint/camelcase
import { GalleryBlock_content } from './__generated__/GalleryBlock_content.graphql';
import styles from './GalleryBlock.module.scss';

graphql`
    fragment GalleryBlock_content on GalleryRecord {
        assets {
            ...appImageBaseFragment @relay(mask: false)
            responsiveImage(imgixParams: { fit: crop, w: 300 }) {
                ...appResponsiveImageFragment @relay(mask: false)
            }
        }
    }
`;

function GalleryBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { assets }: GalleryBlock_content = content;

    return (
        <BlockWrapper tooltip={'GalleryBlock'} className={styles.wrapper} {...rest}>
            <Gallery images={assets} />
        </BlockWrapper>
    );
}

BlockFactory.set('GalleryBlock', GalleryBlock);
