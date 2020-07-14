import moment from 'moment-timezone';
import React, { ReactElement } from 'react';
import { Blocks, Heading, RichText } from '..';
import { ImageInterface } from '../../types/app';
import { NewsModelContentField } from '../../types/graphql';
import styles from './NewsDetail.module.scss';
import symbio from '../../../symbio.config.json';

interface NewsDetailProps {
    news: Readonly<{
        id: string;
        dateFrom: string;
        title: string;
        slug: string;
        perex: string | null;
        content: Readonly<NewsModelContentField>[];
        image: ImageInterface | null;
        tags: ReadonlyArray<{
            id: unknown;
            title: string | null;
        }>;
    }>;
}

export const NewsDetail = ({ news }: NewsDetailProps): ReactElement => {
    return (
        <>
            <Heading tag={'h1'}>aaa</Heading>
            <div className={styles.perex}>
                {moment(String(news.dateFrom)).tz(symbio.tz).format()}
                {news.perex && <RichText content={news.perex} />}
            </div>
            <Blocks blocks={news.content} initialProps={[]} />
        </>
    );
};
