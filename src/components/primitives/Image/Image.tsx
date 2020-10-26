import React, { ReactElement } from 'react';
import { Image as DatoCMSImage } from 'react-datocms';
import { ResponsiveImageType } from 'react-datocms/dist/Image';

export declare type ImageProps = {
    data: ResponsiveImageType;
    className?: string;
    pictureClassName?: string;
    fadeInDuration?: number;
    intersectionTreshold?: number;
    intersectionMargin?: string;
    lazyLoad?: boolean;
    style?: React.CSSProperties;
    pictureStyle?: React.CSSProperties;
    explicitWidth?: boolean;
};

export const Image = (props: ImageProps): ReactElement => {
    return <DatoCMSImage {...props} />;
};

Image.whyDidYouRender = true;
