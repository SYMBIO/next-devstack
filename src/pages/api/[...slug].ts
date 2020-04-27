import { NextApiRequest, NextApiResponse } from 'next';
import { PageCacheFactory } from '../../lib/pageCache/PageCacheFactory';
import { getSiteLocale } from '../../lib/routing/getSiteLocale';
import { Logger } from '../../services';
import { SiteLocale } from '../../types/graphql';
import symbio from '../../../symbio.config';

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (!req.query.slug && symbio.i18n.useLocaleInPath) {
        res.statusCode = 404;
        res.end('Page not found');
    }

    const locale: SiteLocale = symbio.i18n.useLocaleInPath
        ? getSiteLocale(String(req.query.slug[0]))
        : getSiteLocale(process.env.locale);
    const pathParts = req.query.slug.slice(symbio.i18n.useLocaleInPath ? 1 : 0);
    const cache = PageCacheFactory.get();

    if (req.query.update) {
        await cache.update(Array.isArray(pathParts) ? pathParts : [pathParts]);
        // @TODO catch errors
        res.end(JSON.stringify({ status: 'OK' }));
        return;
    }

    const result = await cache.get(locale, Array.isArray(pathParts) ? pathParts : [pathParts]);

    try {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
        return;
    } catch (e) {
        Logger.info('ERROR in ' + __filename);
        Logger.error(e);
    }
}
