import axios from 'axios';
import moment from 'moment-timezone';
import { GetServerSideProps } from 'next';
import { CALENDAR_FORMATS } from '../../constants';
import { Logger } from '../../services';
import { AppData } from '../../types/app';
import BlockRegistry from '../blocks/BlockRegistry';
import symbio from '../../../symbio.config.json';
import getBlockName from '../../utils/getBlockName';
import '../../providers';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, params } = context;
    const { useLocaleInPath } = symbio.i18n;
    let slug = params?.slug || [];

    // handle /_next/data routes
    if (req.url?.startsWith('/_next/data') && req.url?.endsWith('.json')) {
        req.url = req.url?.substr(req.url?.indexOf('/', 12)).replace(/\.json.*$/, '');
        slug = req.url?.split('/').slice(1);
    } else if (req.url?.endsWith('.js') || req.url?.endsWith('.json')) {
        res.statusCode = 500;
        res.end();
        throw new Error('Not implemented');
    }

    const currentUrl = req.url;
    const hostname = req.headers.host;
    const locale: string =
        (useLocaleInPath && slug && Array.isArray(slug) && String(slug[0])) || String(process.env.locale);
    moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    moment.locale(locale);
    moment.tz.setDefault(symbio.tz);

    Logger.log(req?.method + ': ' + currentUrl);

    if (res) {
        res.setHeader('Cache-Control', `public, s-maxage=${symbio.cache.maxAge}, stale-while-revalidate`);
    }

    // load app data from API
    const scheme = hostname === 'localhost:3000' ? 'http://' : 'https://';
    const basePath = scheme + hostname;
    const url = !useLocaleInPath && currentUrl === '/' ? '/homepage' : currentUrl;
    let data;

    try {
        const { data: apiData } = await axios.get(basePath + '/api/page' + url, {
            maxRedirects: 0,
        });
        data = apiData;
    } catch (e) {
        if ('response' in e && e.response.status === 307) {
            context.res.statusCode = 307;
            context.res.setHeader('Location', e.response.headers.location);
            context.res.end();

            return {
                props: {},
            };
        }
    }

    const { redirect, page, blocksData }: AppData = data;

    // if redirect found - let's do it
    if (redirect && redirect.to && res) {
        res.statusCode = Number(redirect.httpStatus);
        res.setHeader('Location', redirect.to);
        res.end(`<script>document.location.href = '${redirect.to}'`);
        return {
            props: {
                ...data,
            },
        };
    }

    // if page doesn't exist -> 404
    if (!page) {
        res.statusCode = 404;
    }

    // blocks initial props handling
    const blocksPropsPromises = [];
    if (blocksData && blocksData.length > 0) {
        for (const block of blocksData) {
            const blockName = getBlockName(block);
            if (blockName && BlockRegistry.has(blockName)) {
                const blk = BlockRegistry.get(blockName);
                if (blk && blk.getServerSideProps) {
                    blocksPropsPromises.push(blk.getServerSideProps({ ...context, locale, basePath, page, block }));
                } else {
                    blocksPropsPromises.push(Promise.resolve({}));
                }
            } else {
                blocksPropsPromises.push(Promise.resolve({}));
            }
        }
    } else {
        const blk = BlockRegistry.get('SubpageListBlock');
        if (blk && blk.getServerSideProps) {
            blocksPropsPromises.push(blk.getServerSideProps({ ...context, locale, basePath, page, block: {} }));
        }
        data.blocksData = [
            {
                __typename: 'SubpageListBlockRecord',
            },
        ];
    }
    const blocksProps = await Promise.all(blocksPropsPromises);

    return {
        props: {
            ...data,
            page,
            locale,
            currentUrl,
            hostname,
            blocksProps,
        },
    };
};
