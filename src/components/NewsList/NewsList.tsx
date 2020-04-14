import React, { ReactElement } from 'react';
import moment from 'moment-timezone';
import { Heading } from '..';
import styles from './NewsList.module.scss';
import symbio from '../../../symbio.config';

interface NewsListProps {
    headline?: string;
    items: readonly NewsItem[];
}

interface NewsItem {
    readonly id: unknown;
    readonly dateFrom: unknown | null;
    readonly title: string | null;
    readonly perex: string | null;
    readonly image: {
        readonly url: string;
        readonly alt: string | null;
    } | null;
    readonly tags: ReadonlyArray<{
        readonly id: unknown;
        readonly title: string | null;
    }>;
}

export const NewsList = ({ headline, items }: NewsListProps): ReactElement<NewsListProps, 'div'> | null => {
    return (
        <div className={styles.newsList}>
            {headline && (
                <Heading tag={'h2'} className={styles.headline}>
                    {headline}
                </Heading>
            )}
            <ul className={styles.items}>
                {items.map((item) => (
                    <li key={`NewsList_item_${item.id}`} className={styles.item}>
                        <article>
                            <Heading tag={`h3`}>{item.title}</Heading>
                            <p>{moment(String(item.dateFrom)).tz(symbio.tz).calendar()}</p>
                            <p>{item.perex}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
};
