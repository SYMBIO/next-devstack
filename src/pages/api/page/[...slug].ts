import { NextApiRequest, NextApiResponse } from 'next';
import { Logger } from '../../../services';
import symbio from '../../../../symbio.config.json';
import ProviderRegistry from '../../../lib/provider/ProviderRegistry';
import PageProvider from '../../../providers/PageProvider';
import '../../../providers';
import { detectLocale } from '../../../lib/routing/LocaleRedirect';

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { useLocaleInPath } = symbio.i18n;
    if (!req.query.slug && useLocaleInPath) {
        const locale = detectLocale(req);
        res.statusCode = 307;

        res.setHeader('Location', '/' + locale);
        res.end();
    }

    const locale: string = useLocaleInPath ? String(String(req.query.slug[0])) : String(process.env.locale);
    const pathParts = req.query.slug.slice(useLocaleInPath ? 1 : 0);
    const provider = ProviderRegistry.get('page') as PageProvider;

    const result = await provider.getPageBySlug(locale, Array.isArray(pathParts) ? pathParts : [pathParts]);

    try {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
        return;
    } catch (e) {
        Logger.info('ERROR in ' + __filename);
        Logger.error(e);
    }
}
