import React from 'react';

interface VimeoVideoProps {
    uid: string;
    className?: string;
    width?: number;
    height?: number;
}

export const VimeoVideo = ({ uid, className, width, height }: VimeoVideoProps) => (
    <iframe
        src={`https://player.vimeo.com/video/${uid}`}
        className={className}
        width={width}
        height={height}
        frameBorder={0}
        allowFullScreen
    />
);
