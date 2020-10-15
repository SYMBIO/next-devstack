import { fetchQuery } from 'react-relay';
import symbio from '../../../symbio.config.json';
import { getSiteLocale } from '../../lib/routing/getSiteLocale';
import { pageDetailQuery, pageListQuery } from '../../relay/page';
import * as d from '../../relay/__generated__/pageDetailQuery.graphql';
import * as l from '../../relay/__generated__/pageListQuery.graphql';
import { appQuery } from '../../relay/__generated__/appQuery.graphql';
import { AppQuery } from '../../relay/app';
import { getPagePattern } from '../../lib/routing/getPagePattern';
import { AppData } from '../../types/app';
import { blocksContent } from '../../blocks/__generated__/blocksContent.graphql';
import AbstractElasticProvider from '../../lib/provider/AbstractElasticProvider';
import { pageDetailQueryResponse } from '../../relay/__generated__/pageDetailQuery.graphql';

class PageProvider extends AbstractElasticProvider<
    d.pageDetailQuery,
    l.pageListQuery,
    NonNullable<pageDetailQueryResponse['item']>
> {
    getApiKey(): string {
        return 'page';
    }

    getId(): string {
        return symbio.datocms.pageTypeId;
    }

    /**
     * Special function returning Page and Site data
     * @param locale
     * @param slug
     */
    async getPageBySlug(locale: string, slug: string[]): Promise<AppData> {
        const pattern = getPagePattern(slug);
        const redirectPattern = slug.join('/');
        const data = await fetchQuery<appQuery>(this.environment, AppQuery, {
            locale: getSiteLocale(locale),
            pattern,
            redirectPattern,
        });

        const blocksData: ReadonlyArray<Omit<blocksContent, ' $refType'> | null> = data.page?.content || [];

        return {
            ...data,
            blocksData,
        };
    }
}

export default new PageProvider(pageDetailQuery, pageListQuery);
