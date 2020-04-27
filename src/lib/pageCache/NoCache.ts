import { fetchQuery } from 'relay-runtime';
import { AppQuery, ContentQuery } from '../../relay/app';
import { appQuery } from '../../relay/__generated__/appQuery.graphql';
import { appContentQuery } from '../../relay/__generated__/appContentQuery.graphql';
import { AppData } from '../../types/app';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { getPagePattern } from '../routing/getPagePattern';
import { getSiteLocale } from '../routing/getSiteLocale';
import { AbstractPageCache } from './AbstractPageCache';

export class NoCache extends AbstractPageCache {
    async get(locale: string, pathParts: string[]): Promise<AppData> {
        const environment = createRelayEnvironment({}, false);
        const promises = [];
        const variables = {
            locale: getSiteLocale(locale),
            pattern: getPagePattern(pathParts),
            redirectPattern: pathParts.join('/'),
        };
        promises.push(
            fetchQuery<appQuery>(environment, AppQuery, variables),
            fetchQuery<appContentQuery>(environment, ContentQuery, variables),
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [data, content] = await Promise.all<any>(promises);

        return {
            ...data,
            blocksData: content.contentPage?.content,
        };
    }

    async update(pathParts: string[]): Promise<void> {
        return;
    }

    async reset(): Promise<void> {
        return;
    }
}
