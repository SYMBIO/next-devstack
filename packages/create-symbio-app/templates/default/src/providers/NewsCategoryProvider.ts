import AbstractDatoCMSProvider from '@symbio/cms-datocms/dist/providers/DatoCMSProvider';
import { GetStaticPathsResult } from 'next';
import * as d from '../relay/__generated__/newsCategoryDetailQuery.graphql';
import * as l from '../relay/__generated__/newsCategoryListQuery.graphql';
import { newsCategoryDetailQuery, newsCategoryListQuery } from '../relay/newsCategory';

class NewsCategoryProvider extends AbstractDatoCMSProvider<d.newsCategoryDetailQuery, l.newsCategoryListQuery> {
    async getStaticPaths(): Promise<GetStaticPathsResult['paths']> {
        return Promise.resolve([]);
    }
}

export default new NewsCategoryProvider(newsCategoryDetailQuery, newsCategoryListQuery, {
    id: '208391',
    apiKey: 'news_category',
    locales: ['cs', 'en'],
});
