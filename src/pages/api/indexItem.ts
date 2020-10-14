import { NextApiRequest, NextApiResponse } from 'next';
import providers from '../../providers';
import AbstractElasticProvider from '../../lib/provider/AbstractElasticProvider';
import AbstractDatoCMSProvider from '../../lib/provider/AbstractDatoCMSProvider';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const isPost = req.method === 'POST';
    const typeId: string = isPost ? req.body.entity.relationships.item_type.data.id : String(req.query.typeId);
    const id: string = isPost ? req.body.entity.id : String(req.query.id);
    const action = isPost ? req.body.event_type : '';
    const simple = !req.query.create;

    try {
        let provider;
        const providerIndex = Object.keys(providers).indexOf(typeId);
        if (providerIndex === -1) {
            provider = Object.values(providers).find(
                (p) => p instanceof AbstractDatoCMSProvider && p.getId() === typeId,
            );
            if (!provider) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(
                    JSON.stringify({
                        status: 'ERROR',
                        message: 'Provider not found',
                    }),
                );
                return;
            }
        } else {
            provider = Object.values(providers)[providerIndex];
        }

        try {
            if (provider && provider instanceof AbstractElasticProvider) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;

                if (action === 'delete') {
                    await provider.unindexByElastic(id); // unindex staging
                    await provider.unindexByElastic(id, undefined, true); // unindex prod
                } else if (action === 'unpublish') {
                    await provider.unindexByElastic(id, undefined, true); // unindex prod
                } else {
                    if (action === 'publish') {
                        await provider.indexByElastic(id, simple, true);
                    } else {
                        await provider.indexByElastic(id, simple);
                    }
                }

                res.end(
                    JSON.stringify({
                        status: 'OK',
                    }),
                );
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 204;
                res.end();
            }
        } catch (e) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(
                JSON.stringify({
                    status: 'ERROR',
                    message: e.message,
                }),
            );
        }
    } catch (e) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(
            JSON.stringify({
                status: 'ERROR',
                message: e.message,
            }),
        );
        return;
    }
};
