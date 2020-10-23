import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { SliderBlock_content } from '../../../blocks/SliderBlock/__generated__/SliderBlock_content.graphql';
import { VideoComponentProps } from '../Video/Video';
import { RichText } from '../../primitives/RichText/RichText';
import { Image } from '../../primitives/Image/Image';
import styles from './Slider.module.scss';

export type SliderProps = SliderBlock_content;

const Video = dynamic<VideoComponentProps>(() => import('../Video/Video').then((mod) => mod.Video));

const Slider = ({
    banners,
    textAlign = 'vlevo',
    autoplay = true,
    interval,
}: SliderProps): ReactElement<SliderProps, 'div'> | null => {
    if (!Array.isArray(banners) || banners.length < 1) {
        return null;
    }

    return (
        <Carousel pause={autoplay ? false : 'hover'} interval={interval ? interval * 1000 : 10000} controls={false}>
            {banners.map(({ id, video, image, headline, description, textAlign }) => (
                <Carousel.Item
                    key={`banner_${id}`}
                    interval={video?.video?.duration ? video.video.duration * 1000 : undefined}
                    className={styles.item}
                >
                    {console.log(video?.video?.duration)}
                    {video ? (
                        <Video video={{ uploadedVideo: video }} autoPlay loop />
                    ) : (
                        image?.responsiveImage && <Image data={image.responsiveImage} />
                    )}
                    <Carousel.Caption>
                        <h3>{headline}</h3>
                        {description && <RichText content={description} />}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

Slider.whyDidYouRender = true;

export { Slider };
