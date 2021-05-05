import React from 'react';
import { VideoProps } from '../../../types/video';
import { UploadedVideo } from '../../primitives/UploadedVideo/UploadedVideo';
import { VimeoVideo } from '../../primitives/VimeoVideo/VimeoVideo';
import { YoutubeVideo } from '../../primitives/YoutubeVideo/YoutubeVideo';

export interface VideoComponentProps {
    video: VideoProps | null;
    autoPlay?: boolean | null;
    objectFit?: 'cover' | 'contain' | undefined;
    loop?: boolean;
    className?: string;
}

const Video = ({ video, autoPlay, objectFit, loop, className }: VideoComponentProps): JSX.Element => {
    if (video?.uploadedVideo) {
        return (
            <UploadedVideo
                video={video.uploadedVideo}
                autoPlay={Boolean(autoPlay)}
                objectFit={objectFit}
                loop={loop}
                className={className}
            />
        );
    }

    if (video?.embeddedVideo) {
        switch (video.embeddedVideo.provider) {
            case 'youtube':
                return video.embeddedVideo.providerUid ? (
                    <YoutubeVideo uid={video.embeddedVideo.providerUid} className={className} />
                ) : (
                    <></>
                );
            case 'vimeo':
                return video.embeddedVideo.providerUid ? (
                    <VimeoVideo uid={video.embeddedVideo.providerUid} className={className} />
                ) : (
                    <></>
                );
        }
    }

    return <></>;
};

Video.whyDidYouRender = true;

export { Video };
