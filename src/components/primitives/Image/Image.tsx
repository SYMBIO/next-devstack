import React, { ReactElement } from 'react';
import { ImageInterface } from '../../../types/app';

/*
import { Image as DatoCMSImage } from 'react-datocms';

export declare type ImageProps = {
    image?: ImageInterface;
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

export const Image = ({ image, ...props }: ImageProps): ReactElement | null => {
    return <DatoCMSImage {...props} />;
};
*/

import NextImage from 'next/image';

declare const VALID_LOADING_VALUES: readonly ['lazy', 'eager', undefined];
declare type LoadingValue = typeof VALID_LOADING_VALUES[number];

export type ImageLayout = 'fixed' | 'intrinsic' | 'responsive' | 'fill';

export declare type ImageProps = Omit<
    JSX.IntrinsicElements['img'],
    'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'
> & {
    image: ImageInterface;
    quality?: number | string;
    priority?: boolean;
    loading?: LoadingValue;
    unoptimized?: boolean;
    width?: number | string;
    height?: number | string;
    layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | undefined;
};

export const Image = ({ image, alt, title, layout, width, height, ...props }: ImageProps): ReactElement | null => {
    if (!image?.url) {
        return null;
    }

    const sizeParams =
        width && height
            ? { width, height, layout }
            : layout === 'fill'
            ? { layout }
            : image.width && image.height
            ? { width: image.width, height: image.height, layout: 'responsive' }
            : { layout: 'fill' };

    return (
        <NextImage
            src={image.url}
            alt={alt || image.alt || ''}
            title={title || image.title || undefined}
            {...sizeParams}
            {...props}
        />
    );
};

Image.whyDidYouRender = true;
