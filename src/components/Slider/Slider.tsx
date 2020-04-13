import React, { ReactElement, ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { BaseDatoCMSProps } from '../../types/app';
import { BannerRecord } from '../../types/graphql';
import { Heading } from '..';
import { Image } from '..';
import { RichText } from '..';
import { Video } from '..';
import styles from './Slider.module.scss';

interface Props {
    banners: Omit<BannerRecord, BaseDatoCMSProps>[];
    textAlign?: string;
    autoplay?: boolean;
    interval?: number;
}

function getAlign(bannerAlign?: string | null, sliderAlign?: string | null): string {
    if (bannerAlign === 'dědit') {
        return sliderAlign === 'vlevo' ? styles.left : styles.right;
    }
    return bannerAlign === 'vlevo' ? styles.left : styles.right;
}

const Banner = ({
    image,
    video,
    headline,
    description,
    textAlign,
    sliderTextAlign,
}: Omit<BannerRecord, BaseDatoCMSProps> & { sliderTextAlign: string }): ReactElement => (
    <article className={styles.banner}>
        {video ? (
            <Video video={video} objectFit="cover" autoPlay muted loop />
        ) : (
            <Image src={image?.url} objectFit="cover" />
        )}
        <div className={[styles.textBox, getAlign(textAlign, sliderTextAlign)].join(' ')}>
            <Heading tag={'h1'}>{headline}</Heading>
            {description && <RichText content={description} />}
        </div>
    </article>
);

const renderIndicator = (onClickHandler: () => void, isSelected: boolean, index: number, label: string): ReactNode => {
    return (
        <li
            className={isSelected ? styles.selected : styles.indicator}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
        >
            <p>{label}</p>
            <span className={styles.progressHolder}>
                <span className={styles.progress}></span>
            </span>
        </li>
    );
};

export const Slider = ({
    banners,
    textAlign = 'vlevo',
    autoplay = true,
    interval = 10,
}: Props): ReactElement<Props, 'div'> | null => {
    if (banners.length < 1) {
        return null;
    }

    if (banners.length === 1) {
        return <Banner {...banners[0]} sliderTextAlign={textAlign} />;
    }

    return (
        <Carousel
            className={styles.slider}
            showArrows={true}
            autoPlay={autoplay}
            interval={interval * 1000}
            infiniteLoop={true}
            useKeyboardArrows={true}
            swipeable={true}
            showStatus={false}
            renderIndicator={renderIndicator}
        >
            {banners.map((banner) => (
                <Banner key={`banner_${banner.id}`} {...banner} sliderTextAlign={textAlign} />
            ))}
        </Carousel>
    );
};
