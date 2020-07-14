/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const symbio = require('../symbio.config.json');
const fs = require('fs');

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

client.items
    .all(
        {
            'filter[type]': symbio.datocms.stringTypeId,
            version: 'current',
        },
        {
            allPages: true,
        },
    )
    .then(async (items) => {
        const data = {};
        for (const item of items) {
            for (const locale in item.value) {
                if (!data.hasOwnProperty(locale)) {
                    data[locale] = {};
                }

                data[locale][item.key] = item.value[locale];
            }
        }
        await fs.promises.writeFile('./src/strings.ts', `/* eslint-disable */
import { useContext } from 'react';
import { AppContext } from './utils/app-context/AppContext';

const data: Record<string, Record<string, string>> = ${JSON.stringify(data, undefined, '  ')};

export function transCount(cnt: number) {
    if (cnt === 0) {
        return 'zero';
    }
    if (cnt === 1) {
        return 'one';
    }
    if (cnt < 5) {
        return 'few';
    }
    return 'many';
}

export default function trans(key: string): string {
    const { locale } = useContext(AppContext);
    return data[locale][key] || data.cs[key] || key;
}
`);
    });
