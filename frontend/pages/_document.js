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

                    <noscript dangerouslySetInnerHTML={{__html: `
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`}} />

                    <script dangerouslySetInnerHTML={{__html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-XXXXX');`}} />
                </body>
            </html>
        )
    }
}