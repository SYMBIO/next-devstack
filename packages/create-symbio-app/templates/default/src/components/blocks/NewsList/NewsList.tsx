import React, { ReactElement } from 'react';
import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import { Heading } from '../../primitives/Heading/Heading';
import { Link } from '../../primitives/Link/Link';
import { PageProps } from '../../../types/page';

interface NewsListProps {
    headline?: string | null;
    items: ReadonlyArray<NewsItem>;
    allNewsLinkText?: string | null;
    allNewsPage?: Pick<PageProps, 'url' | 'id'> | null;
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
    dayjs.extend(Calendar);

    return (
        <div className="flex flex-col">
            {headline && (
                <Heading tag={'h2'} className="mt-0 tablet:mt-8">
                    {headline}
                </Heading>
            )}

            {/*<ul className="flex p-0 flex-wrap">*/}
            {/*    {Array.isArray(items) &&*/}
            {/*        items.map(*/}
            {/*            (item) =>*/}
            {/*                item.slug &&*/}
            {/*                newsPage && (*/}
            {/*                    <CustomCursor component={<NewsListCursor />} key={`NewsList_item_${item.id}`}>*/}
            {/*                        {(ref) => (*/}
            {/*                            <li className="w-full flex-shrink-0 flex-grow-0 inline-block" ref={ref}>*/}
            {/*                                <Link page={newsPage} params={{ slug: item.id + '-' + item.slug }}>*/}
            {/*                                    <article className="p-4 tablet:p-8 bg-white">*/}
            {/*                                        <Heading tag={`h3`}>{item.title}</Heading>*/}
            {/*                                        {item.dateFrom && <p>{dayjs(item.dateFrom).calendar()}</p>}*/}
            {/*                                        {item.perex && <RichText content={item.perex} />}*/}
            {/*                                    </article>*/}
            {/*                                </Link>*/}
            {/*                            </li>*/}
            {/*                        )}*/}
            {/*                    </CustomCursor>*/}
            {/*                ),*/}
            {/*        )}*/}
            {/*</ul>*/}
            {allNewsLinkText && allNewsPage && <Link page={allNewsPage}>{allNewsLinkText}</Link>}
        </div>
    );
};

NewsList.whyDidYouRender = true;

export { NewsList };
