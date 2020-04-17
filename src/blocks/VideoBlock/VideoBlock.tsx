import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Video } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './VideoBlock.module.scss';

graphql`
    fragment VideoBlock_content on VideoRecord {
        id
        autoplay
        video {
            id
            width
            height
            video {
                streamingUrl
                thumbnailUrl
            }
        }
    }
`;

function VideoBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { autoplay, video } = content;
    return (
        <BlockWrapper tooltip={'VideoBlock'} className={styles.wrapper} {...rest}>
            <Video video={video} autoPlay={autoplay} muted={autoplay} controls={!autoplay} />
        </BlockWrapper>
    );
}

BlockFactory.set('VideoBlock', VideoBlock);
