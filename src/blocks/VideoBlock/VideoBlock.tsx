import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Video } from '../../components/organisms/Video/Video';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './VideoBlock.module.scss';

graphql`
    fragment VideoBlock_content on VideoBlockRecord {
        id
        autoplay
        video {
            ...appVideoFragment @relay(mask: false)
        }
    }
`;

function VideoBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { autoplay, video } = content;
    return (
        <BlockWrapper tooltip={'VideoBlock'} className={styles.wrapper} {...rest}>
            <Video video={{ uploadedVideo: video }} autoPlay={autoplay} />
        </BlockWrapper>
    );
}

VideoBlock.whyDidYouRender = true;

BlockRegistry.set('VideoBlock', VideoBlock);
