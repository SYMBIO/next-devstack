import { NextApiRequest, NextApiResponse } from 'next';
import { fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../../lib/relay/createRelayEnvironment';
import { getPagePattern } from '../../lib/routing/getPagePattern';
import { getSiteLocale } from '../../lib/routing/getSiteLocale';
import { AppQuery, ContentQuery } from '../../relay/api/[...slug]';
import { SlugAppQuery } from '../../relay/api/__generated__/SlugAppQuery.graphql';
import { SlugContentQuery } from '../../relay/api/__generated__/SlugContentQuery.graphql';
import { Logger } from '../../services';
import { AppData } from '../../types/app';
import { SiteLocale } from '../../types/graphql';
import symbio from '../../../symbio.config';

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (!req.query.slug) {
        res.statusCode = 404;
        res.end('Page not found');
    }

    const locale: SiteLocale = symbio.i18n.useLocaleInPath ? getSiteLocale(String(req.query.slug[0])) : getSiteLocale();

    const environment = createRelayEnvironment({}, false);
    const promises = [];
    const variables = {
        locale,
        pattern: getPagePattern(req.query.slug.slice(symbio.i18n.useLocaleInPath ? 1 : 0)),
    };

    promises.push(
        fetchQuery<SlugAppQuery>(environment, AppQuery, variables),
        fetchQuery<SlugContentQuery>(environment, ContentQuery, variables),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, content] = await Promise.all<any>(promises);

    const result: AppData = {
        ...data,
        blocksData: content.contentPage?.content,
        relayRecords: environment.getStore().getSource().toJSON(),
    };

    try {
        res.end(JSON.stringify(result));
        return;
    } catch (e) {
        Logger.info('ERROR in ' + __filename);
        Logger.error(e);
    }
}
