import React, { ReactElement } from 'react';
import { ImageInterface } from '@symbio/headless';

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

import NextImage, { ImageProps as NextImageProps } from 'next/image';

export declare type ImageProps = Omit<NextImageProps, 'src'> &
    (
        | {
              image: ImageInterface;
              src?: never;
          }
        | {
              image?: never;
              src: string;
          }
    );

export const Image = ({ image, src, alt, title, layout, width, height, ...props }: ImageProps): ReactElement | null => {
    // 1) if no image is passed, use src and directly next/image
    if (!image?.url) {
        if (src) {
            const nextImageProps: NextImageProps = {
                ...props,
                src,
                alt,
                title,
                layout,
                ...((typeof width === 'string' || typeof width === 'number') && layout !== 'fill' ? { width } : {}),
                ...((typeof height === 'string' || typeof height === 'number') && layout !== 'fill' ? { height } : {}),
            } as NextImageProps;
            return <NextImage {...nextImageProps} />;
        } else {
            return null;
        }
    }

    if (layout !== 'fill') {
        // 2) if width and height are passed use it to size image
        if (
            (typeof width === 'string' || typeof width === 'number') &&
            (typeof height === 'string' || typeof height === 'number')
        ) {
            return (
                <NextImage
                    src={image.url}
                    alt={alt || image.alt || ''}
                    title={title || image.title || undefined}
                    layout={layout}
                    width={width}
                    height={height}
                    {...props}
                />
            );
        }

        // 3) if image has width and height, pass it to the next image with default layout responsive
        if (typeof image.width === 'number' && typeof image.height === 'number') {
            return (
                <NextImage
                    src={image.url}
                    alt={alt || image.alt || ''}
                    title={title || image.title || undefined}
                    layout={layout}
                    width={image.width}
                    height={image.height}
                    {...props}
                />
            );
        }
    }

    // 4) otherwise (no width & height) use layout fill
    return (
        <NextImage
            src={image.url}
            alt={alt || image.alt || ''}
            title={title || image.title || undefined}
            layout={'fill' as ImageProps['layout']}
            {...props}
        />
    );
};

Image.whyDidYouRender = true;
