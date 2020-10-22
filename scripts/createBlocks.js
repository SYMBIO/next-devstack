/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const symbio = require('../symbio.config.json');
const fs = require('fs');

dotenv.config();

const toPascal = (s) => {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

const toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

fs.promises.readFile('./data/blockTemplate/Block.tsx.tpl').then((blockTemplate) => {
    fs.promises.readFile('./data/blockTemplate/Block.module.scss.tpl').then((scssTemplate) => {
        const createBlockTemplate = async (name, fields) => {
            const dir = `./src/blocks/${name}`;
            try {
                await fs.promises.access(dir, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.log('Creating block ' + name);
                    await fs.promises.mkdir(`./src/blocks/${name}`);
                }
            }
            try {
                await fs.promises.access(`${dir}/${name}.tsx`, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    const fieldsGql = fields
                        .map((f) => {
                            if (
                                ['string', 'text', 'boolean', 'integer', 'float', 'json', 'date', 'date_time'].indexOf(
                                    f.fieldType,
                                ) !== -1
                            ) {
                                return '        ' + toCamel(f.apiKey);
                            } else if (['link', 'links'].indexOf(f.fieldType) !== -1) {
                                return '        ' + toCamel(f.apiKey) + ' {\n            id\n        }';
                            } else if (['video'].indexOf(f.fieldType) !== -1) {
                                return (
                                    '        ' +
                                    toCamel(f.apiKey) +
                                    ' {\n            provider\n            providerUid\n            width\n            height\n        }'
                                );
                            } else if (['file', 'files'].indexOf(f.fieldType) !== -1) {
                                if (f.validators.extension && f.validators.extension.predefinedList === 'video') {
                                    return (
                                        '        ' +
                                        toCamel(f.apiKey) +
                                        ' {\n            ...appVideoFragment @relay(mask: false)\n        }'
                                    );
                                } else if (
                                    f.validators.extension &&
                                    f.validators.extension.predefinedList === 'image'
                                ) {
                                    return (
                                        '        ' +
                                        toCamel(f.apiKey) +
                                        ' {\n            ...appImageFragment @relay(mask: false)\n        }'
                                    );
                                }
                                return (
                                    '        ' +
                                    toCamel(f.apiKey) +
                                    ' {\n            id\n            size\n            title\n            url\n        }'
                                );
                            } else if (['color'].indexOf(f.fieldType) !== -1) {
                                return '        ' + toCamel(f.apiKey) + '{\n            hex\n        }';
                            } else if (['lat_lon'].indexOf(f.fieldType) !== -1) {
                                return (
                                    '        ' +
                                    toCamel(f.apiKey) +
                                    ' {\n            latitude\n            longitude\n        }'
                                );
                            } else {
                                return false;
                            }
                        })
                        .filter((a) => a)
                        .join('\n');
                    await fs.promises.writeFile(
                        `${dir}/${name}.tsx`,
                        blockTemplate
                            .toString('utf-8')
                            .replace(/{NAME}/g, name)
                            .replace(/{FIELDS}/g, fieldsGql),
                    );
                }
            }
            try {
                await fs.promises.access(`${dir}/${name}.module.scss`, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    await fs.promises.writeFile(`${dir}/${name}.module.scss`, scssTemplate.toString('utf-8'));
                }
            }
        };

        const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

        client.fields.all(symbio.datocms.pageTypeId).then(async (fields) => {
            for (const field of fields) {
                if (field.apiKey === 'content') {
                    const names = [];
                    for (const modularBlockId of field.validators.richTextBlocks.itemTypes) {
                        const modularBlock = await client.itemTypes.find(modularBlockId);
                        const name = toPascal(modularBlock.apiKey);
                        const fields = await client.fields.all(modularBlockId);
                        names.push([name, fields]);
                        await createBlockTemplate(name, fields);
                    }
                    await fs.promises.writeFile(
                        './src/blocks/index.ts',
                        `/**
 * Import blocks which should be included in SSR
 */
import dynamic from 'next/dynamic';
import { BlockType } from '../types/block';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

graphql\`
    fragment blocksContent on PageModelContentField {
        __typename
${names
    .map(([name, fields]) => (fields.length > 0 ? `        ...${name}_content @relay(mask: false)` : ''))
    .filter((a) => a)
    .join('\n')}
    }
\`;

const blocks: { [name: string]: BlockType } = {
${names
    .reduce((acc, [name]) => {
        acc.push(`    ${name}: dynamic(() => import('./${name}/${name}')),`);
        return acc;
    }, [])
    .join('\n')}
};

export default blocks;
`,
                    );
                    await fs.promises.writeFile(
                        './src/blocks/server.ts',
                        `/**
 * Import blocks which should be included in SSR
 */
import { BlockType } from '../types/block';

${names.map(([name]) => `import ${name} from './${name}/${name}';`).join('\n')}

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

graphql\`
    fragment serverBlocksContent on PageModelContentField {
        __typename
${names
    .map(([name, fields]) => (fields.length > 0 ? `        ...${name}_content @relay(mask: false)` : ''))
    .filter((a) => a)
    .join('\n')}
    }
\`;

const blocks: { [name: string]: BlockType } = {
${names.map(([name]) => `    ${name},`).join('\n')}
};

export default blocks;
`,
                    );
                }
            }
        });
    });
});
