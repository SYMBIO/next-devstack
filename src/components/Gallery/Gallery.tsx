import React, { useState } from 'react';
import { Image } from '..';
import { FileField } from '../../types/graphql';
import Lightbox from 'react-image-lightbox';

interface GalleryProps {
    images: ReadonlyArray<{
        readonly id: unknown;
        readonly url: string;
        readonly alt: string | null;
        readonly width: unknown | null;
        readonly height: unknown | null;
    }>;
}

export const Gallery = ({ images }: GalleryProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(0);

    return (
        <>
            {Array.isArray(images) &&
                images.map((image, index) => (
                    <Image
                        key={image.id}
                        image={image}
                        onClick={() => {
                            setIsOpen(true);
                            setActive(index);
                        }}
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
