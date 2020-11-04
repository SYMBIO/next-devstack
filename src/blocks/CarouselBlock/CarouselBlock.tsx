import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Carousel } from '../../components/organisms/Carousel/Carousel';
import { BaseBlockProps } from '../../types/block';
import { CarouselBlock_content } from './__generated__/CarouselBlock_content.graphql';
import styles from './CarouselBlock.module.scss';

interface CarouselBlockProps extends BaseBlockProps {
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
        <BlockWrapper tooltip={'CarouselBlock'} className={styles.wrapper} {...rest}>
            <Carousel {...content} className={styles.slider} />
        </BlockWrapper>
    );
}

CarouselBlock.whyDidYouRender = true;

export default CarouselBlock;
