import { NextApiRequest, NextApiResponse } from 'next';
import Busboy from 'busboy';
import { fetchQuery } from 'relay-runtime';
import { SiteClient } from 'datocms-client';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
import { Mandrill } from 'mandrill-api';
import { createRelayEnvironment } from '../../../../lib/relay/createRelayEnvironment';
import { formQuery } from '../../../../relay/api/form/[id]/save';
import { getSiteLocale } from '../../../../lib/routing/getSiteLocale';
import { saveFormQuery } from '../../../../relay/api/form/[id]/__generated__/saveFormQuery.graphql';
import symbio from '../../../../../symbio.config.json';

dotenv.config();

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (!process.env.DATOCMS_API_TOKEN_FULL) {
        res.statusCode = 500;
        res.statusMessage = 'No API token found';
        res.end();
        return;
    }

    const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

    if (req.method == 'POST') {
        const busboy = new Busboy({ headers: req.headers });
        const data: Record<string, string> = {};

        busboy.on('field', function (fieldname, val) {
            data[fieldname] = val;
        });

        busboy.on('finish', async function () {
            if (!process.env.MANDRILL_API_KEY) {
                res.statusCode = 500;
                res.statusMessage = 'No Mandrill API key found';
                res.end();
                return;
            }

            const environment = createRelayEnvironment({}, false);
            const { form } = await fetchQuery<saveFormQuery>(environment, formQuery, {
                locale: getSiteLocale(data.locale),
                filter: { id: { eq: data.formId } },
            });

            const humanData: Record<string, string> = {};

            const subject = 'Formulář z webu: ' + form?.title;
            const text: string[] = [];
            let recipientEmail: string | null = null;
            form?.content?.forEach((field) => {
                if (field?.__typename === 'FieldsetRecord') {
                    if (field.legend) {
                        text.push('\n');
                        text.push(field.legend);
                        text.push(''.padStart(field.legend.length, '='));
                    }
                }
                if (field?.__typename === 'SingleLineInputRecord') {
                    humanData[String(field.label)] = data[String(field.id)];
                    text.push(field.label + ': ' + data[String(field.id)] || '');

                    if (
                        field.label &&
                        (field.label.indexOf('E-mail') !== -1 ||
                            field.label.indexOf('e-mail') !== -1 ||
                            field.label.indexOf('Email') !== -1 ||
                            field.label.indexOf('email') !== -1)
                    ) {
                        recipientEmail = data[String(field.id)];
                    }
                }
                if (field?.__typename === 'TextareaRecord') {
                    humanData[String(field.label)] = data[String(field.id)];
                    text.push('\n' + field.label + ':\n' + data[String(field.id)] + '\n');
                }
            });

            await client.items.create({
                itemType: '178107',
                form: data.formId,
                locale: data.locale,
                datetime: dayjs().format(),
                data: JSON.stringify(humanData),
            });

            const mandrillClient = new Mandrill(process.env.MANDRILL_API_KEY);
            const message = {
                text: text.join('\n'),
                subject: subject,
                from_email: symbio.mailer.from,
                from_name: symbio.mailer.name,
                to: form?.emails?.split(',').map((e: string) => ({
                    email: e.trim(),
                    type: 'to',
                })),
                headers: {
                    'Reply-To': symbio.mailer.from,
                },
                metadata: {
                    website: req.headers.host,
                },
            };
            mandrillClient.messages.send({ message, async: false }, () => {
                if (form?.sendToRecipient && recipientEmail) {
                    const message = {
                        text: String(form?.recipientText).replace('{form}', text.join('\n')),
                        subject: form?.title,
                        from_email: symbio.mailer.from,
                        from_name: symbio.mailer.name,
                        to: [
                            {
                                email: recipientEmail,
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
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200;
                        res.end(JSON.stringify({ status: 'OK' }));
                    });
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    res.end(JSON.stringify({ status: 'OK' }));
                }
            });
        });

        busboy.write(req.body);
    }
};
