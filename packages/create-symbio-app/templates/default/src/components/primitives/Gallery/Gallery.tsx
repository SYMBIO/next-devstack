import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ImageInterface } from '@symbio/headless';
import { Image } from '../Image/Image';
import styles from './Gallery.module.scss';

const Lightbox = dynamic(() => import('react-image-lightbox'));

export interface GalleryProps {
    images: ReadonlyArray<ImageInterface>;
}

const Gallery = ({ images }: GalleryProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(0);

    return (
        <div className={styles.gallery}>
            {Array.isArray(images) &&
                images.map((image, index) => (
                    <div
                        key={image.id}
                        onClick={() => {
                            setIsOpen(true);
                            setActive(index);
                        }}
                        className={styles.photo}
                    >
                        <Image image={image} layout="fill" />
                    </div>
                ))}
            {isOpen && (
                <Lightbox
                    mainSrc={images[active].url}
                    nextSrc={active < images.length - 1 ? images[active + 1].url : undefined}
                    prevSrc={active > 0 ? images[active - 1].url : undefined}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => active > 0 && setActive(active - 1)}
                    onMoveNextRequest={() => active < images.length - 1 && setActive(active + 1)}
                />
            )}
        </div>
    );
};

Gallery.whyDidYouRender = true;

export { Gallery };
