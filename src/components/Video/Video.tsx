import React, { DetailedHTMLProps, ReactElement, useEffect, useRef, VideoHTMLAttributes } from 'react';
import { BaseDatoCMSProps } from '../../types/app';
import { FileField } from '../../types/graphql';
import capitalize from '../../utils/capitalize';
import getHLSVideo from '../../utils/getHLSVideo';
import styles from './Video.module.scss';

interface VideoProps extends DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
    video?: Omit<FileField, BaseDatoCMSProps>;
    objectFit?: 'cover' | 'contain';
    objectPosition?: 'top' | 'bottom';
}

export const Video = ({ video, objectFit, objectPosition, ...rest }: VideoProps): ReactElement => {
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
            {...rest}
        >
            <source src={video?.video?.streamingUrl} type="application/vnd.apple.mpegURL" />
        </video>
    );
};
