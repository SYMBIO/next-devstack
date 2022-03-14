/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const { generateModels } = require('./generateModels');
const fs = require('fs');

dotenv.config();

const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

generateModels().then(() => {
    const models = require(`${appDir}/src/models.json`);

    client.items
        .all(
            {
                'filter[type]': models.string,
                version: 'current',
            },
            {
                allPages: true,
            },
        )
        .then(async (items) => {
            const data = {};
            for (const item of items.sort((a, b) => a.key < b.key)) {
                for (const locale in item.value) {
                    if (!data.hasOwnProperty(locale)) {
                        data[locale] = {};
                    }

                    data[locale][item.key] = item.value[locale];
                }
            }
            await fs.promises.writeFile(
                './src/strings.ts',
                `/* eslint-disable */
import symbio from '../symbio.config.json';
const data: Record<string, Record<string, string>> = ${JSON.stringify(data, undefined, '    ')};

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

export default function trans(key: string, locale = symbio.i18n.defaultLocale): string {
    return data[locale][key] || data.cs[key] || key;
}
`,
            );
        });
});
