import { NextApiRequest, NextApiResponse } from 'next';
import { findProvider } from '@symbio/cms';
import getDestination from '@symbio/cms-datocms/dist/utils/getDestination';
import providers from '../../providers';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const locale = Array.isArray(req.query.locale) ? req.query.locale[0] : req.query.locale;
    const type = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type;
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    const provider = findProvider(type, providers);

    const dest = await getDestination({
        locale,
        id,
        provider,
    });

    res.setPreviewData({});
    res.redirect(dest);
};
