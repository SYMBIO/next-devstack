import { NextApiRequest, NextApiResponse } from 'next';
import { datocms } from '../../../symbio.config.json';
import AbstractDatoCMSProvider from '../../lib/provider/AbstractDatoCMSProvider';
import Provider from '../../lib/provider/Provider';
import { findProvider } from '../../utils/findProvider';

interface getDestinationProps {
    locale: string;
    type: string;
    id: string;
    provider?: Provider;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getDestination({ locale, type, id, provider }: getDestinationProps): Promise<string> {
    switch (type) {
        case datocms.pageTypeId: {
            if (provider instanceof AbstractDatoCMSProvider) {
                return (await provider.getPreviewUrl(id, locale)) || `/${locale || ''}`;
            }

            return `/${locale || ''}`;
        }
    }

    return `/${locale || ''}`;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const locale = Array.isArray(req.query.locale) ? req.query.locale[0] : req.query.locale;
    const type = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type;
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    const provider = findProvider(type);

    const dest = await getDestination({
        locale,
        type,
        id,
        provider,
    });

    res.setPreviewData({});
    res.redirect(dest + '?ts=' + new Date().getTime());
};
