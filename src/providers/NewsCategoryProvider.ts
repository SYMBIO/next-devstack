import AbstractDatoCMSProvider from '../lib/provider/AbstractDatoCMSProvider';
import ProviderRegistry from '../lib/provider/ProviderRegistry';
import * as d from '../relay/__generated__/newsCategoryDetailQuery.graphql';
import * as l from '../relay/__generated__/newsCategoryListQuery.graphql';
import { newsCategoryDetailQuery, newsCategoryListQuery } from '../relay/newsCategory';
import { ParsedUrlQuery } from 'querystring';

export default class NewsCategoryProvider extends AbstractDatoCMSProvider<
    d.newsCategoryDetailQuery,
    l.newsCategoryListQuery
> {
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

ProviderRegistry.set(new NewsCategoryProvider(newsCategoryDetailQuery, newsCategoryListQuery));
