import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import '_utils/global-styles';

export default class MyDocument extends Document {
    render () {
        const sheet = new ServerStyleSheet();
        const main = sheet.collectStyles(<Main />);
        const styleTags = sheet.getStyleElement();
        return (
            <html>
                <Head>
                    {styleTags}
                </Head>
                <body>
                    {main}
                    <NextScript />
                </body>
            </html>
        )
    }
}