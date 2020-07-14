import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDestination({ locale, type, id, slug, url }: Record<string, string>): string {
    switch (type) {
        case '217390':
            return `/${locale}/${url}`;
    }

    return `/${locale}`;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const locale = String(req.query.locale);
    const type = String(req.query.type);
    const id = String(req.query.id);
    const slug = String(req.query.slug);
    const url = String(req.query.url);

    const dest = getDestination({
        locale,
        type,
        id,
        slug,
        url,
    });

    res.statusCode = 307;
    res.setHeader('Location', dest);
    res.end();
};
