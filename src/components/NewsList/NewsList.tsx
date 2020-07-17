import React, { ReactElement, useContext } from 'react';
import moment from 'moment-timezone';
import { Heading, Link, RichText } from '..';
import { ImageInterface, Page } from '../../types/app';
import { AppContext } from '../../utils/app-context/AppContext';
import styles from './NewsList.module.scss';

interface NewsListProps {
    headline?: string;
    items: ReadonlyArray<NewsItem>;
    allNewsLinkText?: string;
    allNewsPage?: Page;
}

interface NewsItem {
    id: string;
    dateFrom: string | null;
    title: string | null;
    slug: string | null;
    perex: string | null;
}

export const NewsList = ({
    headline,
    allNewsLinkText,
    allNewsPage,
    items,
}: NewsListProps): ReactElement<NewsListProps, 'div'> | null => {
    const { newsPage } = useContext(AppContext);

    return (
        <div className={styles.newsList}>
            {headline && (
                <Heading tag={'h2'} className={styles.headline}>
                    {headline}
                </Heading>
            )}
            <ul className={styles.newsList__items}>
                {Array.isArray(items) &&
                    items.map(
                        (item) =>
                            item.slug &&
                            newsPage && (
                                <li key={`NewsList_item_${item.id}`} className={styles.newsList__item}>
                                    <Link page={newsPage} plain params={{ slug: item.id + '-' + item.slug }}>
                                        <article>
                                            <Heading tag={`h3`}>{item.title}</Heading>
                                            <p>{moment(item.dateFrom).calendar()}</p>
                                            {item.perex && <RichText content={item.perex} />}
                                        </article>
                                    </Link>
                                </li>
                            ),
                    )}
            </ul>
            {allNewsLinkText && allNewsPage && <Link page={allNewsPage}>{allNewsLinkText}</Link>}
        </div>
    );
};
