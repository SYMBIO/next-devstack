import React, { ReactElement, useContext } from 'react';
import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import { Page } from '../../../types/app';
import { AppContext } from '../../../utils/app-context/AppContext';
import styles from './NewsList.module.scss';
import { Heading } from '../../primitives/Heading/Heading';
import { Link } from '../../primitives/Link/Link';
import { RichText } from '../../primitives/RichText/RichText';

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

const NewsList = ({
    headline,
    allNewsLinkText,
    allNewsPage,
    items,
}: NewsListProps): ReactElement<NewsListProps, 'div'> | null => {
    const { newsPage } = useContext(AppContext);
    dayjs.extend(Calendar);

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
                                            <p>{dayjs(item.dateFrom).calendar()}</p>
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

NewsList.whyDidYouRender = true;

export { NewsList };