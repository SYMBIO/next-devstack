import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Carousel } from '../../components/organisms/Carousel/Carousel';
import { CarouselBlock_content } from './__generated__/CarouselBlock_content.graphql';

interface CarouselBlockProps {
    content: CarouselBlock_content;
}

graphql`
    fragment CarouselBlock_content on CarouselBlockRecord {
        id
        textAlign
        autoplay
        interval
        banners {
            id
            image {
                ...appImageFragment @relay(mask: false)
            }
            video {
                ...appVideoFragment @relay(mask: false)
            }
            headline
            description
            textAlign
        }
    }
`;

function CarouselBlock({ content, ...rest }: CarouselBlockProps): ReactElement | null {
    if (content.banners.length < 1) {
        return null;
    }

    return (
        <BlockWrapper tooltip={'CarouselBlock'} className="w-full !p-0 max-h-16-9" {...rest}>
            <Carousel {...content} />
        </BlockWrapper>
    );
}

CarouselBlock.whyDidYouRender = true;

export default CarouselBlock;
