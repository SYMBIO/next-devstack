import React, { ReactElement } from 'react';
import { ImageInterface } from '@symbio/cms';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

declare const VALID_LAYOUT_VALUES: readonly ['fill', 'fixed', 'intrinsic', 'responsive', undefined];
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number];

export declare type ImageProps = Omit<NextImageProps, 'src'> & {
    layout?: LayoutValue;
} & (
        | {
              image: ImageInterface;
              src?: never;
          }
        | {
              image?: never;
              src: string;
          }
    );

export const Image = ({
    image,
    src,
    alt,
    title,
    layout = 'intrinsic',
    width,
    height,
    blurDataURL,
    placeholder,
    ...props
}: ImageProps): ReactElement | null => {
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
            layout={'fill'}
            {...props}
        />
    );
};

Image.whyDidYouRender = true;
