import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Slider } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './SliderBlock.module.scss';

graphql`
    fragment SliderBlock_content on SliderRecord {
        id
        textAlign
        autoplay
        interval
        banners {
            id
            image {
                url
                height
                width
            }
            video {
                id
                video {
                    streamingUrl
                    thumbnailUrl
                }
            }
            headline
            description
            textAlign
        }
    }
`;

function SliderBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'SliderBlock'} className={styles.wrapper} {...rest}>
            <Slider {...content} />
        </BlockWrapper>
    );
}

BlockFactory.set('SliderBlock', SliderBlock);
