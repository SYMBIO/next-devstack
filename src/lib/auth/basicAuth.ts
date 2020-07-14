import { IncomingMessage, ServerResponse } from 'http';
import symbio from '../../../symbio.config.json';

/**
 * Check username/password against basic auth credentials defined in config
 * @param {string} login
 * @param {string} password
 * @returns {boolean}
 */
function isValidAuth(login: string, password: string): boolean {
    const auths = symbio.auth.basic;
    if (Array.isArray(auths)) {
        for (const auth of auths) {
            if (auth.login === login && auth.password === password) {
                return true;
            }
        }
    }
    return false;
}

export function basicAuth(req: IncomingMessage | undefined, res: ServerResponse | undefined): boolean {
    const b64auth = (req?.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (!login || !password || !isValidAuth(login, password)) {
        if (res) {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="401"');
            res.end && res.end('Unauthorized');
        }
        return false;
    }

    return true;
}
