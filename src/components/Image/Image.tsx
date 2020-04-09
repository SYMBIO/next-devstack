import React, { DetailedHTMLProps, ImgHTMLAttributes, ReactElement, useEffect, useRef } from 'react';
import { useAmp } from 'next/amp';
import objectFitImages from 'object-fit-images';
import { ImgixParams, ImgixParamsAuto, ImgixParamsFm } from '../../types/graphql';
import capitalize from '../../utils/capitalize';
import styles from './Image.module.scss';

interface Props extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    noLazy?: boolean;
    objectFit?: 'cover' | 'contain';
    objectPosition?: 'top' | 'bottom';
    imgixParams?: ImgixParams;
}

type ImgixParamsKeys = keyof ImgixParams;

function buildUrlWithImgixParams(url: string, params: ImgixParams): string {
    let key: ImgixParamsKeys;
    const imgixUrlParams = [];
    for (key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key) && params[key] !== undefined) {
            imgixUrlParams.push(key + '=' + encodeURIComponent(String(params[key])));
        }
    }

    return url + (url.indexOf('?') !== -1 ? '&' : '?') + imgixUrlParams.join('&');
}

function addImgixDimension(imgixParams: ImgixParams, dimension: 'w' | 'h', value?: string | number): void {
    if (!imgixParams.w && value) {
        if (typeof value !== 'number') {
            if (value.match(/^[0-9]+(px)?$/)) {
                value = parseInt(value);
            } else if (value.match(/^[0-9]?\.[0-9]+(px)?$/)) {
                value = parseFloat(value);
            }
        }
        if (typeof value === 'number') {
            imgixParams.w = value;
        }
    }
}

export const Image = ({
    src,
    srcSet,
    alt,
    objectFit,
    objectPosition,
    noLazy = false,
    imgixParams,
    ...rest
}: Props): ReactElement<Props, 'img' | 'amp-img' | 'Fragment'> | null => {
    const ref = useRef<HTMLImageElement>(null);

    // if no src defined -> no image
    if (!src) {
        return <></>;
    }

    imgixParams = imgixParams || {};
    imgixParams.auto = imgixParams.auto || [ImgixParamsAuto.compress, ImgixParamsAuto.format];

    // if no alt property defined, let it empty
    alt = alt || '';

    // format detection
    const isSvg = src.substr(-4) === '.svg';
    const isJpg = src.substr(-4) === '.jpg';

    // function for building image's url
    const buildUrl = isSvg ? (src: string): string => src : buildUrlWithImgixParams;

    // define width for imgix if possible
    addImgixDimension(imgixParams, 'w', rest.width);
    addImgixDimension(imgixParams, 'h', rest.height);

    // create @2x params of Imgix Parameters
    const imgixParams2x = imgixParams;
    if (imgixParams.w) {
        imgixParams2x.w = 2 * imgixParams.w;
    }
    if (imgixParams.h) {
        imgixParams2x.h = 2 * imgixParams.h;
    }

    // get class names according to object-fit
    const classNames: string[] = [styles.img];
    if (objectFit) {
        if (objectPosition) {
            classNames.push(styles[objectFit]);
        } else {
            classNames.push(styles[objectPosition + capitalize(objectFit)]);
        }
    }

    if (useAmp()) {
        const webpUrl = buildUrl(src, { ...imgixParams, fm: ImgixParamsFm.webp });
        let webpSrcSet = srcSet;

        // if srcset not provided but we have width, generate default for dpi
        if (!webpSrcSet && imgixParams.w) {
            webpSrcSet = [webpUrl + ' 1x', buildUrl(src, { ...imgixParams2x, fm: ImgixParamsFm.webp }) + ' 2x'].join(
                ',',
            );
        }

        const webpOptionalAttrs: Record<string, string> = {};
        if (webpSrcSet) {
            webpOptionalAttrs.srcSet = webpSrcSet;
        }

        const origUrl = buildUrl(src, { ...imgixParams, fm: isJpg ? ImgixParamsFm.jpg : ImgixParamsFm.png });
        let origSrcSet = srcSet;

        // if srcset not provided but we have width, generate default for dpi
        if (!origSrcSet && imgixParams.w) {
            origSrcSet = [
                origUrl + ' 1x',
                buildUrl(src, { ...imgixParams2x, fm: isJpg ? ImgixParamsFm.jpg : ImgixParamsFm.png }) + ' 2x',
            ].join(',');
        }

        const origOptionalAttrs: Record<string, string> = {};
        if (origSrcSet) {
            origOptionalAttrs.srcSet = origSrcSet;
        }

        return (
            <amp-img
                ref={ref}
                className={classNames.join(' ')}
                alt={alt || ''}
                src={webpUrl}
                width={rest.width || imgixParams.w || 'auto'}
                height={rest.height || imgixParams.h || 'auto'}
                layout="responsive"
                {...webpOptionalAttrs}
                {...rest}
            >
                {!isSvg && (
                    <amp-img
                        className={classNames.join(' ')}
                        alt={alt || ''}
                        src={origUrl}
                        width={imgixParams.w || 'auto'}
                        height={imgixParams.h || 'auto'}
                        layout="responsive"
                        {...origOptionalAttrs}
                        {...rest}
                    />
                )}
            </amp-img>
        );
    }

    useEffect(() => {
        if (ref.current) {
            objectFitImages(ref.current);
        }
    }, [ref]);

    const url1x = buildUrl(src, imgixParams);

    // if srcset not provided but we have width, generate default for dpi
    if (!srcSet && imgixParams.w) {
        srcSet = [url1x + ' 1x', buildUrl(src, imgixParams2x) + ' 2x'].join(',');
    }

    const optionalAttrs: Record<string, string> = {};
    if (srcSet) {
        optionalAttrs.srcSet = srcSet;
    }

    return (
        <img
            ref={ref}
            key={`image_${src}`}
            src={url1x}
            alt={alt}
            className={classNames.join(' ')}
            loading={noLazy ? 'eager' : 'lazy'}
            {...optionalAttrs}
            {...rest}
        />
    );
};
