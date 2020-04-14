import { NextApiRequest, NextApiResponse } from 'next';
import { fetchQuery } from 'relay-runtime';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
import { createRelayEnvironment } from '../../../../../lib/relay/createRelayEnvironment';
import { formQuery } from '../../../../../relay/api/form/[id]/save';
import { saveFormQuery } from '../../../../../relay/api/form/[id]/__generated__/saveFormQuery.graphql';
import { exportFormQuery } from '../../../../../relay/api/form/[id]/export/[token]';
import { TokenExportFormQuery } from '../../../../../relay/api/form/[id]/export/__generated__/TokenExportFormQuery.graphql';

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!process.env.DATOCMS_API_TOKEN) {
        res.statusCode = 500;
        res.statusMessage = 'No API token found';
        res.end();
        return;
    }

    if (req.query.token !== 'OnRydWUsImlhdCI6MT') {
        res.statusCode = 404;
        res.statusMessage = 'Page not found';
        res.end();
    }

    const environment = createRelayEnvironment({}, false);

    const { form: formCs } = await fetchQuery<saveFormQuery>(environment, formQuery, {
        locale: 'cs',
        filter: { id: { eq: req.query.id } },
    });
    const { form: formEn } = await fetchQuery<saveFormQuery>(environment, formQuery, {
        locale: 'en',
        filter: { id: { eq: req.query.id } },
    });

    const { allFormDataS: data } = await fetchQuery<TokenExportFormQuery>(environment, exportFormQuery, {
        filter: { form: { eq: req.query.id } },
    });

    if ((!formCs && !formEn) || !Array.isArray(data)) {
        res.statusCode = 404;
        res.statusMessage = 'Page not found';
        res.end();
        return;
    }

    const csv = data
        .map((d) => {
            const form = d.language === 'en' ? formEn : formCs;
            if (form?.content) {
                return form.content
                    .reduce(
                        (acc, val) => {
                            if (val) {
                                switch (val.__typename) {
                                    case 'SingleLineInputRecord':
                                    case 'TextareaRecord':
                                        acc.push(d.data[String(val.label)]);
                                        break;
                                    case 'CheckboxRecord':
                                        acc.push(d.data[String(val.label)]);
                                        break;
                                }
                            }
                            return acc;
                        },
                        [moment(d.createdAt).tz('Europe/Prague').format('DD. MM. YYYY HH:mm:ss'), d.language],
                    )
                    .map((a) =>
                        a
                            ? a.indexOf('"') !== -1 || a.indexOf('\n') !== -1 || a.indexOf(',') !== -1
                                ? '"' + a.replace('"', '""') + '"'
                                : a
                            : a,
                    )
                    .join(',');
            }
            return null;
        })
        .filter((a) => a)
        .join('\n');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.end(csv);
};
