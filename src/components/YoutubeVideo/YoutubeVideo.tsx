import React from 'react';

interface YoutubeVideoProps {
    uid: string;
    className?: string;
    width?: number;
    height?: number;
}

export const YoutubeVideo = ({ uid, className, width, height }: YoutubeVideoProps) => (
    <iframe
        className={className}
        width={width}
        height={height}
        src={`https://youtube.com/embed/${uid}`}
        frameBorder="0"
        allowFullScreen
    />
);
