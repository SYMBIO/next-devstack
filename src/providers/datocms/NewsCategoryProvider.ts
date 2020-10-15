import AbstractDatoCMSProvider from '../../lib/provider/AbstractDatoCMSProvider';
import * as d from '../../relay/__generated__/newsCategoryDetailQuery.graphql';
import * as l from '../../relay/__generated__/newsCategoryListQuery.graphql';
import { newsCategoryDetailQuery, newsCategoryListQuery } from '../../relay/newsCategory';
import { ParsedUrlQuery } from 'querystring';

class NewsCategoryProvider extends AbstractDatoCMSProvider<d.newsCategoryDetailQuery, l.newsCategoryListQuery> {
    getApiKey(): string {
        return 'news_category';
    }

    getId(): string {
        return '208391';
    }

    async getStaticPaths(): Promise<ParsedUrlQuery[]> {
        return Promise.resolve([]);
    }
}

export default new NewsCategoryProvider(newsCategoryDetailQuery, newsCategoryListQuery);
