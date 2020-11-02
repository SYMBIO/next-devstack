import dynamic from 'next/dynamic';
import React, { ReactElement, ReactNode } from 'react';
import { ImageInterface, VideoInterface } from '../../../types/app';
import condCls from '../../../utils/conditionalClasses';
import { Image, ImageLayoutFill } from '../../primitives/Image/Image';
import { VideoComponentProps } from '../Video/Video';
import styles from './Slider.module.scss';
import { RichText } from '../../primitives/RichText/RichText';
import { Heading } from '../../primitives/Heading/Heading';

interface BannerInterface {
    id: string;
    headline?: string | null;
    description?: string | null;
    textAlign?: string | null;
    image?: ImageInterface;
    video?: VideoInterface;
}

export type TextAlignCms = 'vlevo' | 'vpravo';

export interface SliderProps {
    banners: BannerInterface[];
    textAlign?: TextAlignCms;
    autoplay?: boolean;
    interval?: number;
    className?: string;
}

function getAlign(bannerAlign?: string | null, sliderAlign?: string | null): string {
    if (bannerAlign === 'dědit') {
        return sliderAlign === 'vlevo' ? styles.left : styles.right;
    }
    return bannerAlign === 'vlevo' ? styles.left : styles.right;
}

const Video = dynamic<VideoComponentProps>(() => import('../Video/Video').then((mod) => mod.Video));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CarouselComponent = dynamic<any>(() => import('react-responsive-carousel').then((mod: any) => mod.Carousel));

const Banner = ({
    image,
    video,
    headline,
    description,
    textAlign,
    sliderTextAlign,
}: BannerInterface & { sliderTextAlign: string }): ReactElement => (
    <article className={styles.banner}>
        {video ? (
            <Video video={{ uploadedVideo: video }} autoPlay loop className={styles.video} />
        ) : (
            image?.responsiveImage && (
                <Image image={image} layout={'fill' as ImageLayoutFill} className={styles.image} />
            )
        )}
        <div className={[styles.textBox, getAlign(textAlign, sliderTextAlign)].join(' ')}>
            <Heading tag={'h1'}>{headline}</Heading>
            {description && <RichText content={description} />}
        </div>
    </article>
);

const renderIndicator = (interval: number) =>
    function Indicator(
        onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
        isSelected: boolean,
        index: number,
        label: string,
    ): ReactNode {
        return (
            <li
                className={condCls(isSelected ? styles.selected : '', styles.indicator)}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
            >
                <span className={styles.progressHolder}>
                    <span
                        className={styles.progress}
                        style={{ transitionDuration: isSelected ? interval + 's' : '0s' }}
                    />
                </span>
            </li>
        );
    };

const Slider = ({
    banners,
    textAlign = 'vlevo',
    autoplay = true,
    interval = 10,
    className,
}: SliderProps): ReactElement<SliderProps, 'div'> | null => {
    if (!Array.isArray(banners) || banners.length < 1) {
        return null;
    }

    if (banners.length === 1) {
        return <Banner {...banners[0]} sliderTextAlign={textAlign} />;
    } else {
        return (
            <CarouselComponent
                className={condCls(styles.slider, className)}
                showArrows={true}
                autoPlay={autoplay}
                interval={interval * 1000}
                infiniteLoop={true}
                useKeyboardArrows={true}
                swipeable={true}
                showStatus={false}
                renderIndicator={renderIndicator(interval)}
                showThumbs={false}
            >
                {banners.map((banner) => (
                    <Banner key={`banner_${banner.id}`} {...banner} sliderTextAlign={textAlign} />
                ))}
            </CarouselComponent>
        );
    }
};

Slider.whyDidYouRender = true;

export { Slider };
