import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Video } from '../../components/organisms/Video/Video';
import { YoutubeVimeoBlock_content } from './__generated__/YoutubeVimeoBlock_content.graphql';

export interface YoutubeVimeoBlockProps {
    content: YoutubeVimeoBlock_content;
}

graphql`
    fragment YoutubeVimeoBlock_content on YoutubeVimeoBlockRecord {
        id
        video {
            provider
            providerUid
            width
            height
            title
            thumbnailUrl
        }
    }
`;

function YoutubeVimeoBlock({
    content,
    ...rest
}: YoutubeVimeoBlockProps): ReactElement<YoutubeVimeoBlockProps, 'BaseBlock'> {
    const { video } = content;

    return (
        <BlockWrapper tooltip={'YoutubeVimeoBlock'} {...rest}>
            <Video video={{ embeddedVideo: video }} />
        </BlockWrapper>
    );
}

YoutubeVimeoBlock.whyDidYouRender = true;

export default YoutubeVimeoBlock;
