import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import App, { AppContext } from 'next/app';
import symbio from '../../symbio.config';
import { basicAuth } from '../lib/auth/basicAuth';

export default class MyApp extends App {
    public static async getInitialProps(ctx: AppContext): Promise<AppInitialProps> {
        symbio.auth.basic && !basicAuth(ctx.ctx.req, ctx.ctx.res);

        return await super.getInitialProps(ctx);
    }
}
