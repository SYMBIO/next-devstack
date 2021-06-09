import spawn from 'cross-spawn';

export function install(root: string, dependencies: string[] | null): Promise<void> {
    return new Promise((resolve, reject) => {
        const command = 'npm';
        const args = ([
            'install',
            dependencies && '--save',
            dependencies && '--save-exact',
            '--loglevel',
            'error',
        ].filter(Boolean) as string[]).concat(dependencies || []);

        const child = spawn(command, args, {
            stdio: 'inherit',
            env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
        });
        child.on('close', (code: number) => {
            if (code !== 0) {
                reject({ command: `${command} ${args.join(' ')}` });
                return;
            }
            resolve();
        });
    });
}
