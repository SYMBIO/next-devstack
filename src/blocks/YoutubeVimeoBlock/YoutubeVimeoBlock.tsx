import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './YoutubeVimeoBlock.module.scss';
import { BlockWrapper, VimeoVideo, YoutubeVideo } from '../../components';

graphql`
    fragment YoutubeVimeoBlock_content on YoutubeVimeoBlockRecord {
        id
        video {
            provider
            providerUid
            width
            height
        }
    }
`;

function YoutubeVimeoBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { video } = content;

    return (
        <BlockWrapper tooltip={'YoutubeVimeoBlock'} className={styles.wrapper} {...rest}>
            {video.provider === 'youtube' && (
                <YoutubeVideo uid={video.providerUid} width={video.width} height={video.height} />
            )}
            {video.provider === 'vimeo' && (
                <VimeoVideo uid={video.providerUid} width={video.width} height={video.height} />
            )}
        </BlockWrapper>
    );
}

BlockRegistry.set('YoutubeVimeoBlock', YoutubeVimeoBlock);
