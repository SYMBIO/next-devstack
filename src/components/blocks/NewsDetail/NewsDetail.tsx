import moment from 'moment-timezone';
import React, { ReactElement } from 'react';
import { newsContentFragment } from '../../../relay/__generated__/newsContentFragment.graphql';
import { Blocks, Heading, RichText } from '../../index';
import { ImageInterface } from '../../../types/app';
import styles from './NewsDetail.module.scss';
import symbio from '../../../../symbio.config.json';

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

NewsDetail.whyDidYouRender = true;

export { NewsDetail };
