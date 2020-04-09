import { NextApiRequest, NextApiResponse } from 'next';
import { fetchQuery } from 'relay-runtime';
import { createRelayEnvironment } from '../../lib/relay/createRelayEnvironment';
import { AppQuery } from '../../relay/app';

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const url = req.query.url;

    if (!url) {
        res.statusCode = 400;
        res.send('Bad request');
        return;
    }

    const environment = createRelayEnvironment({}, false);
    await fetchQuery(environment, AppQuery, {});

    res.send('{}');
    return;
}
