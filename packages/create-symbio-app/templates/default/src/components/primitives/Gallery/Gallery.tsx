import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ImageInterface } from '@symbio/cms';
import { Image } from '../Image/Image';

const Lightbox = dynamic(() => import('react-image-lightbox'));

export interface GalleryProps {
    images: ReadonlyArray<ImageInterface>;
}

const Gallery = ({ images }: GalleryProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(0);

    return (
        <div className="w-full h-80 flex flex-row flex-wrap -ml-4 -mt-4 -mr-4 justify-center">
            {Array.isArray(images) &&
                images.map((image, index) => (
                    <div
                        key={image.id}
                        onClick={() => {
                            setIsOpen(true);
                            setActive(index);
                        }}
                        className="relative m-4 cursor-pointer object-cover flex-grow-0 flex-shrink-0"
                    >
                        <Image image={image} layout="fill" objectFit="cover" />
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
