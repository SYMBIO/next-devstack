import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Slider } from '../../components/organisms/Slider/Slider';
import { BaseBlockProps } from '../../types/block';
import styles from './SliderBlock.module.scss';

graphql`
    fragment SliderBlock_content on SliderBlockRecord {
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

function SliderBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'SliderBlock'} className={styles.wrapper} {...rest}>
            <Slider {...content} className={styles.slider} />
        </BlockWrapper>
    );
}

SliderBlock.whyDidYouRender = true;

export default SliderBlock;
