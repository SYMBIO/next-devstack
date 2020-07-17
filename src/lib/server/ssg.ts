import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import symbio, { i18n, locales, tz } from '../../../symbio.config.json';
import { basicAuth } from '../auth/basicAuth';
import BlockRegistry from '../blocks/BlockRegistry';
import moment from 'moment-timezone';
import { CALENDAR_FORMATS } from '../../constants';
import ProviderRegistry from '../provider/ProviderRegistry';
import PageProvider from '../../providers/PageProvider';
import getBlockName from '../../utils/getBlockName';
import '../../providers';

const getBlocksProps = async (
    context: {
        params?: ParsedUrlQuery;
        preview?: boolean;
        previewData?: unknown;
    },
    locale: string,
    pathParts: string | string[],
): Promise<{
    props: { [key: string]: unknown };
}> => {
    const provider = ProviderRegistry.get('page') as PageProvider;
    const props = await provider.getPageBySlug(locale, Array.isArray(pathParts) ? pathParts : [pathParts]);
    const blocksPropsPromises = [];
    if (props.blocksData && props.blocksData.length > 0) {
        for (const block of props.blocksData) {
            const blockName = getBlockName(block);
            if (blockName && BlockRegistry.has(blockName)) {
                const blk = BlockRegistry.get(blockName);
                if (blk && blk.getStaticProps) {
                    blocksPropsPromises.push(blk.getStaticProps({ ...context, locale, page: props.page, block }));
                    continue;
                }
            }
            blocksPropsPromises.push(Promise.resolve({}));
        }
    } else {
        const blk = BlockRegistry.get('SubpageListBlock');
        if (blk && blk.getStaticProps) {
            blocksPropsPromises.push(blk.getStaticProps({ ...context, locale, page: props.page, block: {} }));
        }
        props.blocksData = [
            {
                __typename: 'SubpageListBlockRecord',
            },
        ];
    }
    const blocksProps = await Promise.all(blocksPropsPromises);

    return {
        props: {
            ...props,
            locale,
            blocksProps,
        },
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    const locale: string = i18n.useLocaleInPath && params?.slug ? params.slug[0] : String(process.env.locale);

    const auth = symbio.auth as Record<string, unknown> | undefined;
    if (auth && auth.basic) {
        throw new Error(
            "You have basic auth enabled in symbio.config.json, but it's not compatible with Static Site Generation",
        );
    }

    moment.updateLocale(locale, { calendar: CALENDAR_FORMATS[locale] });
    moment.locale(locale);
    moment.tz.setDefault(tz);

    const pathParts = params?.slug?.slice(i18n.useLocaleInPath ? 1 : 0);

    if (pathParts) {
        return await getBlocksProps(context, locale, pathParts);
    }

    return {
        props: {},
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: Array<string | { params: ParsedUrlQuery }> = [];
    const provider = ProviderRegistry.get('page') as PageProvider;

    // loop over all locales
    for (const locale of locales) {
        const localePaths = await provider.getStaticPaths(locale);
        paths.push(...localePaths.map((lp) => ({ params: lp })));
    }

    console.log(JSON.stringify(paths));

    return {
        paths,
        fallback: false,
    };
};
