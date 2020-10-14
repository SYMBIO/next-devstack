import { NextApiRequest, NextApiResponse } from 'next';
import symbio from '../../../symbio.config.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDestination({ locale, type, id, slug, url, target }: Record<string, string>): string {
    switch (type) {
        case symbio.datocms.pageTypeId:
            return `/${locale}/${url}`;
    }

    if (target) {
        return `/${locale}/${target}`;
    }

    return `/${locale}`;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const locale = String(req.query.locale);
    const type = String(req.query.type);
    const id = String(req.query.id);
    const slug = String(req.query.slug);
    const url = String(req.query.url);
    const target = String(req.query.target);

    const dest = getDestination({
        locale,
        type,
        id,
        slug,
        url,
        target,
    });

    res.setPreviewData({});
    res.writeHead(307, { Location: dest + '?ts=' + new Date().getTime() });
    res.end();
};
