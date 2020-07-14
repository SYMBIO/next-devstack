import { NextApiRequest, NextApiResponse } from 'next';
import ProviderRegistry from '../../lib/provider/ProviderRegistry';
import '../../providers';
import AbstractElasticProvider from '../../lib/provider/AbstractElasticProvider';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const isPost = req.method === 'POST';
    const typeId: string = isPost ? req.body.entity.relationships.item_type.data.id : String(req.query.typeId);
    const id: string = isPost ? req.body.entity.id : String(req.query.id);
    const action = isPost ? req.body.event_type : '';
    const simple = !req.query.create;

    try {
        const provider = ProviderRegistry.get(typeId);

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
