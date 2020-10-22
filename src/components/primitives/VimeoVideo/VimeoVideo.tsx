import React from 'react';
import styles from './VimeoVideo.module.scss';
import condCls from '../../../utils/conditionalClasses';

export interface VimeoVideoI {
    uid: string;
    className?: string;
    width?: number;
    height?: number;
}

const VimeoVideo = ({ uid, className, width, height }: VimeoVideoI) => (
    <iframe
        src={`https://player.vimeo.com/video/${uid}`}
        className={condCls(styles.iframe, className)}
        width={width}
        height={height}
        frameBorder={0}
        allowFullScreen
    />
);

VimeoVideo.whyDidYouRender = true;

export { VimeoVideo };
