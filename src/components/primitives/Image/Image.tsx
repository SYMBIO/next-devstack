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
declare const VALID_LAYOUT_VALUES: readonly ['fill', 'fixed', 'intrinsic', 'responsive', undefined];
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number];
export declare type ImageProps = Omit<
    JSX.IntrinsicElements['img'],
    'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'
> & {
    image?: ImageInterface;
    quality?: number | string;
    priority?: boolean;
    loading?: LoadingValue;
    unoptimized?: boolean;
    layout?: Exclude<LayoutValue, 'fill'>;
} & (
        | {
              width: number | string;
              height: number | string;
              layout?: Exclude<LayoutValue, 'fill'>;
          }
        | {
              width?: never;
              height?: never;
              layout: 'fill';
          }
    );

export const Image = ({ image, alt, title, layout, ...props }: ImageProps): ReactElement | null => {
    if (!image?.url) {
        return null;
    }

    const sizeParams:
        | {
              width: number | string;
              height: number | string;
              layout?: Exclude<LayoutValue, 'fill'>;
          }
        | {
              width?: never;
              height?: never;
              layout: 'fill';
          } =
        props.width && props.height
            ? { width: props.width, height: props.height, layout }
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
