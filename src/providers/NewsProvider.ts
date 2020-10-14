import moment from 'moment-timezone';
import { ParsedUrlQuery } from 'querystring';
import { fetchQuery } from 'react-relay';
import AbstractDatoCMSProvider from '../lib/provider/AbstractDatoCMSProvider';
import { getSiteLocale } from '../lib/routing/getSiteLocale';
import { newsDetailQuery, newsListQuery, newsStaticPathsQuery } from '../relay/news';
import * as d from '../relay/__generated__/newsDetailQuery.graphql';
import * as l from '../relay/__generated__/newsListQuery.graphql';
import * as s from '../relay/__generated__/newsStaticPathsQuery.graphql';

class NewsProvider extends AbstractDatoCMSProvider<d.newsDetailQuery, l.newsListQuery> {
    getApiKey(): string {
        return 'news';
    }

    getId(): string {
        return '208392';
    }

    getFilterParams(): Record<string, Record<string, string>> {
        return { dateFrom: { lte: moment().format() }, slug: { neq: 'null' } };
    }

    async getStaticPaths(locale: string): Promise<ParsedUrlQuery[]> {
        const params: ParsedUrlQuery[] = [];

        const data = await fetchQuery<s.newsStaticPathsQuery>(this.environment, newsStaticPathsQuery, {
            locale: getSiteLocale(locale),
        });

        for (const news of data.allNews) {
            params.push({
                slug: news.id + '-' + news.slug,
            });
        }

        return params;
    }
}

export default new NewsProvider(newsDetailQuery, newsListQuery);
