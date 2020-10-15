import React from 'react';
import { VideoProps } from '../../../types/video';
import { UploadedVideo } from '../../primitives/UploadedVideo/UploadedVideo';
import { VimeoVideo } from '../../primitives/VimeoVideo/VimeoVideo';
import { YoutubeVideo } from '../../primitives/YoutubeVideo/YoutubeVideo';

interface Props {
    video: VideoProps | null;
    autoPlay?: boolean | null;
    objectFit?: 'cover' | 'contain' | undefined;
    loop?: boolean;
}

const Video = ({ video, autoPlay, objectFit, loop }: Props): JSX.Element => {
    if (video?.uploadedVideo) {
        return (
            <UploadedVideo video={video.uploadedVideo} autoPlay={Boolean(autoPlay)} objectFit={objectFit} loop={loop} />
        );
    }

    if (video?.embeddedVideo) {
        switch (video.embeddedVideo.provider) {
            case 'youtube':
                return video.embeddedVideo.providerUid ? <YoutubeVideo uid={video.embeddedVideo.providerUid} /> : <></>;
            case 'vimeo':
                return video.embeddedVideo.providerUid ? <VimeoVideo uid={video.embeddedVideo.providerUid} /> : <></>;
        }
    }

    return <></>;
};

Video.whyDidYouRender = true;

export { Video };
