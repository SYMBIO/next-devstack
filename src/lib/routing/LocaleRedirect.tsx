import { IncomingMessage } from 'http';
import { NextPageContext } from 'next';
import React, { ReactNode } from 'react';
import { MyPageProps } from '../../types/app';
import { locales } from '../../../symbio.config.json';

function LocaleRedirect({ locale }: MyPageProps): ReactNode {
    return <script dangerouslySetInnerHTML={{ __html: `document.location = '/${locale}';` }} />;
}

export function detectLocale(req?: IncomingMessage): string {
    if (req) {
        const al = req.headers['accept-language'];
        if (al) {
            const candidates = al.split(',').map((l) => {
                if (l.indexOf(';') !== -1) {
                    return l.split(';')[0];
                }
                return l;
            });

            for (const can of candidates) {
                if (locales.indexOf(can) !== -1) {
                    return can;
                }
                if (locales.indexOf(can.substr(0, 2)) !== -1) {
                    return can;
                }
            }
        }
    }
    return locales[0];
}

LocaleRedirect.getInitialProps = function ({ req, res }: NextPageContext): { locale: string } {
    const locale = detectLocale(req);

    if (res) {
        res.statusCode = 302;
        res.setHeader('Location', '/' + locale);
        res.end(`<script>document.location.href = '/${locale}'`);
    }

    return {
        locale,
    };
};

export default LocaleRedirect;
