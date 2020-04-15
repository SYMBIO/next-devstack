import React, { useState } from 'react';
import { Image } from '../index';
import { FileField } from '../../types/graphql';
import Lightbox from 'react-image-lightbox';

interface GalleryProps {
    images: FileField[];
}

export const Gallery = ({ images }: GalleryProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(0);

    return (
        <>
            {images.map((image, index) => (
                <Image
                    key={image.id}
                    src={image.url}
                    onClick={() => {
                        setIsOpen(true);
                        setActive(index);
                    }}
                    width={Number(image.width)}
                    height={Number(image.height)}
                />
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
        </>
    );
};
