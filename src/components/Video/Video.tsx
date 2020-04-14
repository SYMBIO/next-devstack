import React, { DetailedHTMLProps, ReactElement, useEffect, VideoHTMLAttributes } from 'react';
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
    useEffect(() => {
        if (video) {
            getHLSVideo(video.video?.streamingUrl, `video-${video.id}`);
        }
    }, [video]);

    const classNames: string[] = [styles.video];
    if (objectFit) {
        if (!objectPosition) {
            classNames.push(styles[objectFit]);
        } else {
            classNames.push(styles[objectPosition + capitalize(objectFit)]);
        }
    }

    return (
        <video id={`video-${video?.id || rest.id}`} className={classNames.join(' ')} {...rest}>
            <source src={video?.video?.streamingUrl} type="application/vnd.apple.mpegURL" />
        </video>
    );
};
