import { NextApiRequest, NextApiResponse } from 'next';
import { fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../../../lib/relay/createRelayEnvironment';
import { getPagePattern } from '../../../lib/routing/getPagePattern';
import { getSiteLocale } from '../../../lib/routing/getSiteLocale';
import { AppQuery, ContentQuery } from '../../../relay/api/[locale]/[...slug]';
import { SlugAppQuery } from '../../../relay/api/[locale]/__generated__/SlugAppQuery.graphql';
import { SlugContentQuery } from '../../../relay/api/[locale]/__generated__/SlugContentQuery.graphql';
import { SiteLocale } from '../../../types/graphql';

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const locale: SiteLocale = getSiteLocale(String(req.query.locale));

    const environment = createRelayEnvironment({}, false);
    const { site, webSetting: settings, redirect, page } = await fetchQuery<SlugAppQuery>(environment, AppQuery, {
        locale,
        pattern: getPagePattern(req.query),
    });
    const { contentPage } = page
        ? await fetchQuery<SlugContentQuery>(environment, ContentQuery, {
              locale: locale,
              pattern: getPagePattern(req.query),
          })
        : { contentPage: null };

    res.end(
        JSON.stringify({
            site,
            settings,
            redirect,
            page,
            blocksData: contentPage?.content,
            relayRecords: environment.getStore().getSource().toJSON(),
        }),
    );
    return;
}
