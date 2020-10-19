import dayjs from 'dayjs';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { ReactElement } from 'react';
import { newsContentFragment } from '../../../relay/__generated__/newsContentFragment.graphql';
import { ImageInterface } from '../../../types/app';
import styles from './NewsDetail.module.scss';
import symbio from '../../../../symbio.config.json';
import { Heading } from '../../primitives/Heading/Heading';
import { RichText } from '../../primitives/RichText/RichText';
import { Blocks } from '../../base/Blocks/Blocks';

interface NewsDetailProps {
    news: Readonly<{
        id: string;
        dateFrom: string;
        title: string;
        slug: string;
        perex: string | null;
        content: ReadonlyArray<newsContentFragment | null>;
        image: ImageInterface | null;
        tags: ReadonlyArray<{
            id: unknown;
            title: string | null;
        }>;
    }>;
}

const NewsDetail = ({ news }: NewsDetailProps): ReactElement => {
    dayjs.extend(utc);
    dayjs.extend(timeZone);
    return (
        <>
            <Heading tag={'h1'}>aaa</Heading>
            <div className={styles.perex}>
                {dayjs.tz(String(news.dateFrom), symbio.tz).format()}
                {news.perex && <RichText content={news.perex} />}
            </div>
            <Blocks blocksData={news.content} initialProps={[]} />
        </>
    );
};

NewsDetail.whyDidYouRender = true;

export { NewsDetail };
