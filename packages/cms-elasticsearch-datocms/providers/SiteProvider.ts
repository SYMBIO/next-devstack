import { Provider } from '@symbio/cms';
import { Environment, fetchQuery } from 'relay-runtime';
import { siteFragment } from '../relay/__generated__/siteFragment.graphql';
import * as d from '../../headless/relay/site';
import { siteQuery } from '../../headless/relay/__generated__/siteQuery.graphql';
import { createRelayEnvironment } from '../../cms-datocms/relay/createRelayEnvironment';
import getElastic from '../../headless/lib/elastic';

export type Site = Omit<siteFragment, ' $refType'>;

class SiteProvider implements Provider {
    environment: Environment;

    constructor() {
        this.environment = createRelayEnvironment({}, false);
    }

    getApiKey() {
        return 'site';
    }

    getId() {
        return 'site';
    }

    async get(locale: string): Promise<Site | undefined> {
        const site = await fetchQuery<siteQuery>(this.environment, d.siteQuery, {
            locale,
        }).toPromise();

        return site?._site;
    }

    async getByElastic(locale: string): Promise<Site> {
        return (
            await getElastic().search({
                index: this.getIndex(locale),
                body: {
                    query: {
                        match_all: {},
                    },
                },
            })
        ).body.hits.hits[0]._source;
    }

    async index(locale: string): Promise<void> {
        await getElastic().index({
            index: this.getIndex(locale),
            body: {
                ...(await this.get(locale)),
                locale,
            },
            refresh: true,
            id: '1',
        });
    }

    getIndex(locale: string) {
        return 'site_' + locale;
    }
}

export default new SiteProvider();
