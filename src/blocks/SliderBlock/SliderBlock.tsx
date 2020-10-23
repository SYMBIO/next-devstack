import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Slider } from '../../components/organisms/Slider/Slider';
import condCls from '../../utils/conditionalClasses';
import { SliderBlock_content } from './__generated__/SliderBlock_content.graphql';
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

function SliderBlock({ content }: { content: SliderBlock_content }): ReactElement {
    return (
        <BlockWrapper tooltip={'SliderBlock'} className={condCls('px-0', styles.wrapper)} fluid>
            <Slider {...content} />
        </BlockWrapper>
    );
}

SliderBlock.whyDidYouRender = true;

export default SliderBlock;
