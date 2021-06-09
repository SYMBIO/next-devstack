import dayjs from 'dayjs';
import { ParsedUrlQuery } from 'querystring';
import { fetchQuery } from 'react-relay';
import AbstractDatoCMSProvider from '@symbio/cms-datocms/dist/providers/AbstractDatoCMSProvider';
import { newsDetailQueryResponse } from '../relay/__generated__/newsDetailQuery.graphql';
import { newsListQueryResponse } from '../relay/__generated__/newsListQuery.graphql';
import { newsDetailQuery, newsListQuery, newsStaticPathsQuery } from '../relay/news';
import * as d from '../relay/__generated__/newsDetailQuery.graphql';
import * as l from '../relay/__generated__/newsListQuery.graphql';
import * as s from '../relay/__generated__/newsStaticPathsQuery.graphql';

class NewsProvider extends AbstractDatoCMSProvider<
    d.newsDetailQuery,
    l.newsListQuery,
    newsDetailQueryResponse['item'],
    newsListQueryResponse['items']
> {

    getFilterParams(): Record<string, Record<string, string | boolean>> {
        return { dateFrom: { lte: dayjs().format() }, slug: { neq: 'null' }, title: { exists: true } };
    }

    async getStaticPaths(locale: string): Promise<ParsedUrlQuery[]> {
        const params: ParsedUrlQuery[] = [];

        const data = await fetchQuery<s.newsStaticPathsQuery>(this.getEnvironment(false), newsStaticPathsQuery, {
            locale,
        }).toPromise();

        if (data) {
            for (const news of data.allNews) {
                params.push({
                    slug: news.id + '-' + news.slug,
                });
            }
        }

        return params;
    }
}

export default new NewsProvider(newsDetailQuery, newsListQuery, {
    id: '208392',
    locales: ['cs', 'en'],
    apiKey: 'news'
});
