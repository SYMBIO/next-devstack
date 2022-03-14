/* eslint-disable */
const dotenv = require('dotenv');
const SiteClient = require('datocms-client').SiteClient;
const fs = require('fs').promises;
const { generateModels } = require('./generateModels');
const appDir = process.cwd();

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

generateModels().then(() => {
    const models = require(`${appDir}/src/models.json`);
    Promise.all([
        fs.readFile('node_modules/@symbio/headless/data/blockTemplate/Block.tsx.tpl'),
        fs.readFile('node_modules/@symbio/headless/data/componentTemplate/Component.tsx.tpl'),
        fs.readFile('node_modules/@symbio/headless/data/componentTemplate/Component.module.scss.tpl'),
        fs.readFile('node_modules/@symbio/headless/data/componentTemplate/Component.stories.tsx.tpl'),
    ]).then(([blockTemplate, componentTemplate, scssTemplate, storiesTemplate]) => {
        const createBlockTemplate = async (blockName, componentName, fields) => {
            const dir = `${appDir}/src/blocks/${blockName}`;
            try {
                await fs.access(dir, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.error('Making dir for block ' + dir);
                    await fs.mkdir(dir);
                }
            }

            const file = `${dir}/${blockName}.tsx`;
            try {
                await fs.access(file, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.error('Creating block ' + file);
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
                    await fs.writeFile(
                        `${dir}/${blockName}.tsx`,
                        blockTemplate
                            .toString('utf-8')
                            .replace(/{BLOCK_NAME}/g, blockName)
                            .replace(/{COMPONENT_NAME}/g, componentName)
                            .replace(/{FIELDS}/g, fieldsGql ? '\n' + fieldsGql : ''),
                    );

                    await createComponentTemplate(componentName);
                }
            }
        };

        const createComponentTemplate = async (componentName) => {
            const dir = `${appDir}/src/components/blocks/${componentName}`;
            try {
                await fs.access(dir, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.error('Making dir for block component ' + dir);
                    await fs.mkdir(dir);
                }
            }

            async function createFile(file, template, type = '') {
                try {
                    await fs.access(file, fs.constants.R_OK);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        console.error(`Creating block ${type} ${file}`);
                        await fs.writeFile(file, template.toString('utf-8').replace(/{NAME}/g, componentName));
                    }
                }
            }

            await createFile(`${dir}/${componentName}.tsx`, componentTemplate, 'component');
            await createFile(`${dir}/${componentName}.stories.tsx`, storiesTemplate, 'story');
            await createFile(`${dir}/${componentName}.module.scss`, scssTemplate, 'styles');
        };

        const client = new SiteClient(process.env.DATOCMS_API_TOKEN_FULL);

        client.fields.all(models.page).then(async (fields) => {
            for (const field of fields) {
                if (field.apiKey === 'content') {
                    const names = [];
                    for (const modularBlockId of field.validators.richTextBlocks.itemTypes) {
                        const modularBlock = await client.itemTypes.find(modularBlockId);
                        const name = toPascal(modularBlock.apiKey);
                        const componentName = name.replace(/Block$/, '');
                        const fields = await client.fields.all(modularBlockId);
                        names.push([name, fields]);
                        await createBlockTemplate(name, componentName, fields);
                    }
                    names.sort();
                    await fs.writeFile(
                        `${appDir}/src/blocks/index.ts`,
                        `/**
 * Import blocks which should be included in SSR
 */
import dynamic from 'next/dynamic';
import { BlockType } from '@symbio/headless/dist/types/block';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';
${names
    .reduce((acc, [name]) => {
        acc.push(`import ${name} from './${name}/${name}';`);
        return acc;
    }, [])
    .join('\n')}

graphql\`
    fragment blocksContent on PageModelContentField {
        __typename
${names
    .map(([name, fields]) => `        ...${name}_content @relay(mask: false)`)
    .filter((a) => a)
    .join('\n')}
    }
\`;

const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } =
    process.env.NODE_ENV === 'production'
        ? {
${names
    .reduce((acc, [name]) => {
        acc.push(`              ${name}: dynamic(() => import('./${name}/${name}')),`);
        return acc;
    }, [])
    .join('\n')}
          }
        : {
${names
    .reduce((acc, [name]) => {
        acc.push(`              ${name},`);
        return acc;
    }, [])
    .join('\n')}
          };

export default blocks;
`,
                    );
                    await fs.writeFile(
                        `${appDir}/src/blocks/server.ts`,
                        `/**
 * Import blocks which should be included in SSR
 */
import { BlockType } from '@symbio/headless/dist/types/block';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';

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

const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } = {
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
