import axios from 'axios';
import moment from 'moment-timezone';
import { GetServerSideProps } from 'next';
import { CALENDAR_FORMATS } from '../../constants';
import { Logger } from '../../services';
import { AppData } from '../../types/app';
import { SiteLocale } from '../../types/graphql';
import BlockFactory from '../blocks/BlockFactory';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { getSiteLocale } from '../routing/getSiteLocale';
import symbio from '../../../symbio.config';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, params } = context;

    const slug = params?.slug || [];
    const currentUrl = req.url;
    const hostname = req.headers.host;
    const locale: SiteLocale =
        (symbio.i18n.useLocaleInPath && slug && Array.isArray(slug) && getSiteLocale(slug[0])) ||
        getSiteLocale(process.env.locale);

    moment.updateLocale(String(locale), { calendar: CALENDAR_FORMATS[locale] });
    moment.locale(locale);

    Logger.log(req?.method + ': ' + currentUrl);

    if (res) {
        res.setHeader('Cache-Control', `public, s-maxage=${symbio.cache.maxAge}, stale-while-revalidate`);
    }

    // load app data from API
    const { data } = await axios.get(
        (hostname === 'localhost:3000' ? 'http://' : 'https://') +
            hostname +
            '/api/page' +
            (currentUrl === '/' ? '/homepage' : currentUrl),
    );
    const environment = createRelayEnvironment({}, false);
    const { redirect, page, blocksData }: AppData = data;

    // if redirect found - let's do it
    if (redirect && redirect.to && res) {
        res.statusCode = Number(redirect.httpStatus);
        res.setHeader('Location', redirect.to);
        res.end(`<script>document.location.href = '${redirect.to}'`);
        return {
            ...data,
        };
    }

    // if page doesn't exist -> 404
    if (!page) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err: any = new Error('Page not found');
        err.code = 'ENOENT';
        throw err;
    }

    // blocks initial props handling
    const bIPPromises = [];
    if (blocksData) {
        for (const block of blocksData) {
            const blockName = block?.__typename?.replace('Record', 'Block');
            if (blockName && BlockFactory.has(blockName)) {
                const blk = BlockFactory.get(blockName);
                if (blk && blk.getServerSideProps) {
                    bIPPromises.push(blk.getServerSideProps({ ...context, locale, environment }));
                } else {
                    bIPPromises.push(Promise.resolve({}));
                }
            } else {
                bIPPromises.push(Promise.resolve({}));
            }
        }
    }
    const blocksInitialProps = await Promise.all(bIPPromises);

    return {
        props: {
            ...data,
            locale,
            currentUrl,
            hostname,
            blocksInitialProps,
            relayRecords: environment.getStore().getSource().toJSON(),
        },
    };
};
