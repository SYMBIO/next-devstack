import { NextApiRequest, NextApiResponse } from 'next';
// import { SiteClient } from 'datocms-client';
import { Mandrill } from 'mandrill-api';
import Busboy from 'busboy';
import dotenv from 'dotenv';
import randomString from '@symbio/headless/utils/randomString';

dotenv.config();

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (!process.env.DATOCMS_API_TOKEN_FULL) {
        res.statusCode = 500;
        res.statusMessage = 'No API token found';
        res.end();
        return;
    }

    // const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

    if (req.method == 'POST') {
        const busboy = new Busboy({ headers: req.headers });
        const data: Record<string, string> = {};

        busboy.on('field', function (fieldname, val) {
            data[fieldname] = String(val);
        });

        busboy.on('finish', async function () {
            if (!process.env.MANDRILL_API_KEY) {
                res.statusCode = 500;
                res.statusMessage = 'No Mandrill API key found';
                res.end();
                return;
            }

            const hash = randomString(10);
            const subject =
                data.locale === 'cs' ? 'Novinky e-mailem z Národního divadla' : 'The National Theatre Newsletter';

            // await client.items.create({
            //     itemType: '178672',
            //     language: data.locale,
            //     email: data.email,
            //     confirmed: false,
            //     hash,
            // });

            const mandrillClient = new Mandrill(process.env.MANDRILL_API_KEY);
            const url = 'https://' + req.headers.host + '/api/newsletter/confirm?hash=' + hash;
            const message = {
                html:
                    data.locale === 'cs'
                        ? `<p>Potvrďte prosím přihlášení odběru novinek z Národního divadla otevřením následující adresy:</p>
<p><a href="${url}">${url}</a></p>
<p>Národní divadlo</p>`
                        : `Please, confirm the newsletter service with openning the following address:<br />
<p><a href="${url}">${url}</a></p>
<p>The National Theatre</p>`,
                subject: subject,
                from_email: 'no-reply@example.com',
                from_name: 'SYMBIO devstack',
                to: [
                    {
                        email: data.email,
                        type: 'to',
                    },
                ],
                headers: {
                    'Reply-To': 'no-reply@example.com',
                },
                metadata: {
                    website: 'example.com',
                },
            };
            mandrillClient.messages.send({ message, async: false }, () => {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ status: 'OK' }));
            });
        });

        busboy.write(req.body);
    }
};
