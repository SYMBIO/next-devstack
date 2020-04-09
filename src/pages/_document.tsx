import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import LevelUpRedirect from '../lib/routing/LevelUpRedirect';
import { Logger } from '../services';

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
    public static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        Logger.log('_document getInitialProps');

        try {
            return await Document.getInitialProps(ctx);
        } catch (e) {
            if (e instanceof LevelUpRedirect) {
                const targetUrl = ctx.req?.url?.substr(0, ctx.req.url.lastIndexOf('/'));
                if (ctx.res) {
                    ctx.res.statusCode = 302;
                    ctx.res.setHeader('Location', targetUrl || '/');
                    ctx.res.end();
                }
                return {
                    html: `<html lang="en"><head><title>Redirect</title><meta http-equiv="refresh" content="0; url=${targetUrl}"></head></html>`,
                };
            }
            throw e;
        }
    }
}
