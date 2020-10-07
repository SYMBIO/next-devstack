import React, { DetailedHTMLProps, ReactElement, useEffect, useRef, VideoHTMLAttributes } from 'react';
import { VideoInterface } from '../../../types/app';
import capitalize from '../../../utils/capitalize';
import getHLSVideo from '../../../utils/getHLSVideo';
import styles from './UploadedVideo.module.scss';

interface VideoProps extends DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
    video?: VideoInterface;
    objectFit?: 'cover' | 'contain';
    objectPosition?: 'top' | 'bottom';
}

const UploadedVideo = ({ video, objectFit, objectPosition, autoPlay, ...rest }: VideoProps): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (video && videoRef.current) {
            getHLSVideo(video.video?.streamingUrl, videoRef.current);
        }
    }, [video, videoRef]);

    const classNames: string[] = [styles.video];
    if (objectFit) {
        if (!objectPosition) {
            classNames.push(styles[objectFit]);
        } else {
            classNames.push(styles[objectPosition + capitalize(objectFit)]);
        }
    }

    return (
        <video
            id={`video-${video?.id || rest.id}`}
            ref={videoRef}
            className={classNames.join(' ')}
            poster={video?.video?.thumbnailUrl + '?time=0'}
            autoPlay={autoPlay}
            muted={autoPlay}
            controls={!autoPlay}
            {...rest}
        >
            <source src={video?.video?.streamingUrl} type="application/vnd.apple.mpegURL" />
        </video>
    );
};

UploadedVideo.whyDidYouRender = true;

export { UploadedVideo };
