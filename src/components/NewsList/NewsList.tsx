import React, { ReactElement, useContext } from 'react';
import moment from 'moment-timezone';
import { Heading, Link, RichText } from '..';
import { AppContext } from '../../utils/app-context/AppContext';
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
    readonly slug: string | null;
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
    const { newsPage } = useContext(AppContext);

    return (
        <div className={styles.newsList}>
            {headline && (
                <Heading tag={'h2'} className={styles.headline}>
                    {headline}
                </Heading>
            )}
            <ul className={styles.newsList__items}>
                {items.map(
                    (item) =>
                        item.slug &&
                        newsPage && (
                            <li key={`NewsList_item_${item.id}`} className={styles.newsList__item}>
                                <Link page={newsPage} plain params={{ slug: item.slug }}>
                                    <article>
                                        <Heading tag={`h3`}>{item.title}</Heading>
                                        <p>{moment(String(item.dateFrom)).tz(symbio.tz).calendar()}</p>
                                        {item.perex && <RichText content={item.perex} />}
                                    </article>
                                </Link>
                            </li>
                        ),
                )}
            </ul>
        </div>
    );
};
