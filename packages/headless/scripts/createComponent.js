/* eslint-disable */
import { Logger } from '../services';

const fs = require('fs');

const toPascal = (s) => {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

const variables = {};
process.argv.forEach((val) => {
    if (val.startsWith('F')) {
        variables.folder = val.substring(2);
    }
    if (val.startsWith('N')) {
        variables.name = val.substring(2);
    }
});

fs.promises.readFile('./data/componentTemplate/Component.tsx.tpl').then((componentTemplate) => {
    fs.promises.readFile('./data/componentTemplate/Component.module.scss.tpl').then((scssTemplate) => {
        const createComponentTemplate = async (name, folder) => {
            const dir = `./src/components/${toPascal(folder)}/${toPascal(name)}`;
            try {
                await fs.promises.access(dir, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    Logger.error('Creating component ' + name);
                    await fs.promises.mkdir(`./src/components/${toPascal(folder)}/${toPascal(name)}`);
                }
            }
            try {
                await fs.promises.access(`${dir}/${toPascal(name)}.tsx`, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    await fs.promises.writeFile(
                        `${dir}/${toPascal(name)}.tsx`,
                        componentTemplate.toString('utf-8').replace(/{NAME}/g, toPascal(name)),
                    );
                }
            }
            try {
                await fs.promises.access(`${dir}/${toPascal(name)}.module.scss`, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    await fs.promises.writeFile(`${dir}/${toPascal(name)}.module.scss`, scssTemplate.toString('utf-8'));
                }
            }
        };

        createComponentTemplate(variables.name, variables.folder);
    });
});
