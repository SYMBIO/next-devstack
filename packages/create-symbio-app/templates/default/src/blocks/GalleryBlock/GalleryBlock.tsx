import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { GalleryBlock_content } from './__generated__/GalleryBlock_content.graphql';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Gallery } from '../../components/primitives/Gallery/Gallery';

interface GalleryBlockProps {
    content: GalleryBlock_content;
}

graphql`
    fragment GalleryBlock_content on GalleryBlockRecord {
        assets {
            ...appImageBaseFragment @relay(mask: false)
        }
    }
`;

function GalleryBlock({ content }: GalleryBlockProps): ReactElement | null {
    const { assets }: GalleryBlock_content = content;

    if (assets.length > 0) {
        return (
            <BlockWrapper tooltip={'GalleryBlock'}>
                <Gallery images={assets} />
            </BlockWrapper>
        );
    }

    return null;
}

GalleryBlock.whyDidYouRender = true;

export default GalleryBlock;
