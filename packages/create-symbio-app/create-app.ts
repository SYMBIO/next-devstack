import chalk from 'chalk';
import cpy from 'cpy';
import path from 'path';
import { makeDir } from './helpers/make-dir';
import { tryGitInit } from './helpers/git';
import { install } from './helpers/install';
import { isFolderEmpty } from './helpers/is-folder-empty';
import { isWriteable } from './helpers/is-writeable';

export class DownloadError extends Error {}

export async function createApp({ appPath }: { appPath: string }): Promise<void> {
    const root = path.resolve(appPath);

    if (!(await isWriteable(path.dirname(root)))) {
        console.error('The application path is not writable, please check folder permissions and try again.');
        console.error('It is likely you do not have write permissions for this folder.');
        process.exit(1);
    }

    const appName = path.basename(root);

    await makeDir(root);
    if (!isFolderEmpty(root, appName)) {
        process.exit(1);
    }

    const originalDirectory = process.cwd();

    const displayedCommand = 'npm';
    console.log(`Creating a new SYMBIO app in ${chalk.green(root)}.`);
    console.log();

    process.chdir(root);

    console.log(`Installing dependencies using ${displayedCommand}...`);
    console.log();

    await cpy('**', root, {
        parents: true,
        cwd: path.join(__dirname, 'templates', 'default'),
        rename: (name) => {
            switch (name) {
                case 'gitignore': {
                    return '.'.concat(name);
                }
                // README-template.md is ignored by webpack-asset-relocator-loader used by ncc:
                // https://github.com/zeit/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
                case 'README-template.md': {
                    return 'README.md';
                }
                default: {
                    return name;
                }
            }
        },
    });

    await install(root, null);
    console.log();

    if (tryGitInit(root)) {
        console.log('Initialized a git repository.');
        console.log();
    }

    let cdpath: string;
    if (path.join(originalDirectory, appName) === appPath) {
        cdpath = appName;
    } else {
        cdpath = appPath;
    }

    console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} run dev`));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} run build`));
    console.log('    Builds the app for production.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} start`));
    console.log('    Runs the built app in production mode.');
    console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log(chalk.cyan('  cd'), cdpath);
    console.log(`  ${chalk.cyan(`${displayedCommand} run dev`)}`);
    console.log();
}
