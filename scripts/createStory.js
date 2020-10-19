/* eslint-disable */
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

fs.promises.readFile('./data/storyTemplate/StoryTemplate.tsx.tpl').then((storyTemplate) => {
    const createStoryTemplate = async (name, folder) => {
        if (folder && name) {
            const dir = `./src/components/${toPascal(folder)}/${toPascal(name)}`;
            try {
                await fs.promises.access(dir, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    await fs.promises.mkdir(`./src/components/${toPascal(folder)}/${toPascal(name)}`);
                    console.log('\x1b[32m', `Folder created in components/${toPascal(folder)}/${toPascal(name)}`);
                }
            }
            try {
                await fs.promises.access(`${dir}/${toPascal(name)}.stories.tsx`, fs.constants.R_OK);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    await fs.promises.writeFile(
                        `${dir}/${toPascal(name)}.stories.tsx`,
                        storyTemplate
                            .toString('utf-8')
                            .replace(/{NAME}/g, toPascal(name))
                            .replace(/{FOLDER}/g, toPascal(folder)),
                    );

                    console.log(
                        '\x1b[32m',
                        `Story file created in components/${toPascal(folder)}/${toPascal(name)}.stories.tsx`,
                    );
                }
            }
        } else {
            console.log(
                '\x1b[31m',
                'You probably forgot to specify folder or name!\nExample: npm run create-story F=primitives N=Milos',
            );
            return false;
        }
    };

    createStoryTemplate(variables.name, variables.folder);
});
