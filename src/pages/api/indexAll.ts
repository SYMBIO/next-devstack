import { NextApiRequest, NextApiResponse } from 'next';
import AbstractElasticProvider from '../../lib/provider/AbstractElasticProvider';
import { findProvider } from '../../utils/findProvider';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const typeId = String(req.query.typeId);
    const prod = Boolean(req.query.prod) || false;

    try {
        const provider = findProvider(typeId);

        try {
            if (provider && provider instanceof AbstractElasticProvider) {
                res.statusCode = 200;
                await provider.indexAll(prod);
                res.setHeader('Content-Type', 'application/json');
                res.end(
                    JSON.stringify({
                        status: 'OK',
                    }),
                );
                return;
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 204;
                res.end(
                    JSON.stringify({
                        status: 'EMPTY',
                    }),
                );
                return;
            }
        } catch (e) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(
                JSON.stringify({
                    status: 'ERROR',
                    message: e.message,
                    error: e,
                }),
            );
            return;
        }
    } catch (e) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(
            JSON.stringify({
                status: 'ERROR',
                message: e.message,
                error: e,
            }),
        );
        return;
    }
};
