import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BaseBlockProps } from '../../types/block';
import { GalleryBlock_content } from './__generated__/GalleryBlock_content.graphql';
import styles from './GalleryBlock.module.scss';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Gallery } from '../../components/primitives/Gallery/Gallery';

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

GalleryBlock.whyDidYouRender = true;

export default GalleryBlock;
