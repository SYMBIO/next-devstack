import { NextApiRequest, NextApiResponse } from 'next';
import { SiteClient } from 'datocms-client';
import dotenv from 'dotenv';
import { fetchQuery } from 'relay-runtime';
import { Mandrill } from 'mandrill-api';
import { createRelayEnvironment } from '../../../lib/relay/createRelayEnvironment';
import { confirmSubscriberQuery } from '../../../relay/api/newsletter/confirm';
import { confirmSubscriberQuery as q } from '../../../relay/api/newsletter/__generated__/confirmSubscriberQuery.graphql';
import symbio from '../../../../symbio.config.json';

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!process.env.DATOCMS_API_TOKEN_FULL) {
        res.statusCode = 500;
        res.statusMessage = 'No API token found';
        res.end();
        return;
    }

    if (!process.env.MANDRILL_API_KEY) {
        res.statusCode = 500;
        res.statusMessage = 'No Mandrill API key found';
        res.end();
        return;
    }

    const hash = String(req.query.hash);

    if (!hash) {
        res.statusCode = 404;
        res.statusMessage = 'Page not found';
        res.end();
        return;
    }

    try {
        const environment = createRelayEnvironment({}, false);
        const newsletterSubscriberData = await fetchQuery<q>(environment, confirmSubscriberQuery, {
            filter: {
                hash: { eq: hash },
            },
        }).toPromise();

        if (!newsletterSubscriberData?.newsletterSubscriber) {
            res.statusCode = 404;
            res.statusMessage = 'Page not found';
            res.end();
            return;
        }

        const { newsletterSubscriber } = newsletterSubscriberData;

        if (!newsletterSubscriber.confirmed) {
            const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);
            await client.items.update(String(newsletterSubscriber.id), {
                confirmed: true,
            });

            const mandrillClient = new Mandrill(process.env.MANDRILL_API_KEY);
            const message = {
                text: symbio.newsletter.body.replace('{EMAIL}', String(newsletterSubscriber.email)),
                subject: symbio.newsletter.subject,
                from_email: symbio.mailer.from,
                from_name: symbio.mailer.name,
                to: [
                    {
                        email: symbio.newsletter.to,
                        type: 'to',
                    },
                ],
                headers: {
                    'Reply-To': symbio.mailer.from,
                },
                metadata: {
                    website: req.headers.host,
                },
            };
            mandrillClient.messages.send({ message, async: false }, () => {
                res.statusCode = 200;
                res.end(JSON.stringify({ status: 'OK' }));
            });
            return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ status: 'OK' }));
    } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ status: 'ERROR', error: e.message }));
    }
};
