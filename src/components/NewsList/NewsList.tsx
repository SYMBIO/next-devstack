import React, { ReactElement, useContext } from 'react';
import moment from 'moment-timezone';
import { Heading, Link, RichText } from '..';
import { Page } from '../../types/app';
import { AppContext } from '../../utils/app-context/AppContext';
import styles from './NewsList.module.scss';
import symbio from '../../../symbio.config';

interface NewsListProps {
    headline?: string;
    items: readonly NewsItem[];
    allNewsLinkText?: string;
    allNewsPage?: Page;
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
    readonly category: {
        readonly id: unknown;
        readonly slug: string | null;
    } | null;
    readonly tags: ReadonlyArray<{
        readonly id: unknown;
        readonly title: string | null;
    }>;
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
            <ul className={styles.items}>
                {Array.isArray(items) &&
                    items.map(
                        (item) =>
                            item.slug &&
                            newsPage && (
                                <li key={`NewsList_item_${item.id}`} className={styles.item}>
                                    <Link
                                        page={newsPage}
                                        params={{
                                            slug: item.id + '-' + item.slug,
                                        }}
                                    >
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
            {allNewsLinkText && allNewsPage && <Link page={allNewsPage}>{allNewsLinkText}</Link>}
        </div>
    );
};
