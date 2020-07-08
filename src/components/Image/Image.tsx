import React, { DetailedHTMLProps, ImgHTMLAttributes, ReactElement } from 'react';
import { ImageInterface } from '../../types/app';
import capitalize from '../../utils/capitalize';
import styles from './Image.module.scss';
import { Image as DatoCMSImage } from 'react-datocms';

interface Props extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    image?: ImageInterface;
    objectFit?: 'cover' | 'contain';
    objectPosition?: 'top' | 'bottom';
}

export const Image = ({
    image,
    src,
    objectFit,
    objectPosition,
    ...rest
}: Props): ReactElement<Props, 'img' | 'amp-img' | 'Fragment'> | null => {
    // if no responsiveImage defined -> no image
    if (!image?.responsiveImage) {
        return <></>;
    }

    // get class names according to object-fit
    const classNames: string[] = [styles.img];
    if (objectFit) {
        if (!objectPosition) {
            classNames.push(styles[objectFit]);
        } else {
            classNames.push(styles[objectPosition + capitalize(objectFit)]);
        }
    }

    return (
        <div className={styles.imageWrapper} {...rest}>
            <DatoCMSImage key={`image_${src}`} className={classNames.join(' ')} data={image.responsiveImage} />
        </div>
    );
};
