import AbstractDatoCMSProvider from '@symbio/cms-datocms/dist/providers/AbstractDatoCMSProvider';
import * as d from '../relay/__generated__/newsCategoryDetailQuery.graphql';
import * as l from '../relay/__generated__/newsCategoryListQuery.graphql';
import { newsDetailQueryResponse } from '../relay/__generated__/newsDetailQuery.graphql';
import { newsListQueryResponse } from '../relay/__generated__/newsListQuery.graphql';
import { newsCategoryDetailQuery, newsCategoryListQuery } from '../relay/newsCategory';
import { ParsedUrlQuery } from 'querystring';

class NewsCategoryProvider extends AbstractDatoCMSProvider<
    d.newsCategoryDetailQuery,
    l.newsCategoryListQuery,
    newsDetailQueryResponse['item'],
    newsListQueryResponse['items']
> {
    async getStaticPaths(): Promise<ParsedUrlQuery[]> {
        return Promise.resolve([]);
    }
}

export default new NewsCategoryProvider(newsCategoryDetailQuery, newsCategoryListQuery, {
    id: '208391',
    apiKey: 'news_category',
    locales: ['cs', 'en'],
});
