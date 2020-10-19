import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BaseBlockProps } from '../../types/block';
import styles from './YoutubeVimeoBlock.module.scss';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Video } from '../../components/organisms/Video/Video';

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
            <Video video={{ embeddedVideo: video }} />
        </BlockWrapper>
    );
}

YoutubeVimeoBlock.whyDidYouRender = true;

export default YoutubeVimeoBlock;
