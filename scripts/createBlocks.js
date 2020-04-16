/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const symbio = require('../symbio.config');
const fs = require('fs');

dotenv.config();

const toPascal = (s) => {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

fs.promises.readFile('./data/blockTemplate/Block.tsx.tpl').then((blockTemplate) => {
    fs.promises.readFile('./data/blockTemplate/Block.module.scss.tpl').then((scssTemplate) => {
        const createBlockTemplate = async (name, fields) => {
            const dir = `./src/blocks/${name}Block`;
            try {
                await fs.promises.access(dir, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.log('Creating block ' + name + 'Block');
                    await fs.promises.mkdir(`./src/blocks/${name}Block`);
                }
            }
            try {
                await fs.promises.access(`${dir}/${name}Block.tsx`, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    const fieldsGql = fields
                        .map((f) => {
                            if (
                                ['string', 'text', 'boolean', 'integer', 'float', 'json', 'date', 'date_time'].indexOf(
                                    f.fieldType,
                                ) !== -1
                            ) {
                                return '        ' + f.apiKey + '\n';
                            } else if (['link', 'links'].indexOf(f.fieldType) !== -1) {
                                return '        ' + f.apiKey + '{\n            id\n        }\n';
                            } else if (['video'].indexOf(f.fieldType) !== -1) {
                                return '        ' + f.apiKey + '{\n            provider\n            url\n        }\n';
                            } else if (['asset', 'assets'].indexOf(f.fieldType) !== -1) {
                                return '        ' + f.apiKey + '{\n            id\n            url\n            width\n            height\n        }\n';
                            } else if (['color'].indexOf(f.fieldType) !== -1) {
                                return '        ' + f.apiKey + '{\n            hex\n        }\n';
                            } else if (['lat_lon'].indexOf(f.fieldType) !== -1) {
                                return '        ' + f.apiKey + '{\n            id\n            latitude\n            longitude\n        }\n';
                            } else {
                                return '';
                            }
                        })
                        .join('');
                    await fs.promises.writeFile(
                        `${dir}/${name}Block.tsx`,
                        blockTemplate.toString('utf-8').replace(/{NAME}/g, name),
                    );
                }
            }
            try {
                await fs.promises.access(`${dir}/${name}Block.module.scss`, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    await fs.promises.writeFile(`${dir}/${name}Block.module.scss`, scssTemplate.toString('utf-8'));
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
                        names.push(name);
                        await createBlockTemplate(name, fields);
                    }
                    await fs.promises.writeFile(
                        './src/blocks/index.ts',
                        `/**
 * Import blocks which should be included in SSR
 */
${names.map((name) => `import './${name}Block/${name}Block';\n`)}

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';

graphql\`
    fragment blocksContent on PageModelContentField {
        __typename
${names.map((name) => `        ...${name}Block_content @relay(mask: false)\n`)}
    }
\`;
`,
                    );
                }
            }
        });
    });
});
