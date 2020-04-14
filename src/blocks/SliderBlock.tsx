import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../components';
import { Slider } from '../components';
import BlockFactory from '../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../types/block';
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
            }
            video {
                id
                video {
                    streamingUrl
                }
            }
            headline
            description
            textAlign
        }
    }
`;

function SliderBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const slider = content;

    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <Slider {...slider} />
        </BlockWrapper>
    );
}

BlockFactory.set('SliderBlock', SliderBlock);
