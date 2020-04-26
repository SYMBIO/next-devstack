import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { fetchQuery } from 'react-relay';
import symbio from '../../../symbio.config';
import { staticPathsQuery as sPQ } from '../../relay/api/__generated__/staticPathsQuery.graphql';
import { staticPathsQuery } from '../../relay/api/staticPaths';
import { SiteLocale } from '../../types/graphql';
import BlockFactory from '../blocks/BlockFactory';
import { PageCacheFactory } from '../pageCache/PageCacheFactory';
import { createRelayEnvironment } from '../relay/createRelayEnvironment';
import { getSiteLocale } from '../routing/getSiteLocale';
import { getStaticParamsFromBlocks } from './getStaticParamsFromBlocks';

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    const locale: SiteLocale = symbio.i18n.useLocaleInPath ? getSiteLocale(String(params?.slug[0])) : getSiteLocale();
    const environment = createRelayEnvironment({}, false);
    const pathParts = params?.slug.slice(symbio.i18n.useLocaleInPath ? 1 : 0);
    if (pathParts) {
        const cache = PageCacheFactory.get();
        const props = await cache.get(locale, Array.isArray(pathParts) ? pathParts : [pathParts]);
        const bIPPromises = [];
        if (props.blocksData) {
            for (const block of props.blocksData) {
                const blockName = block?.__typename?.replace('Record', 'Block');
                if (blockName && BlockFactory.has(blockName)) {
                    const blk = BlockFactory.get(blockName);
                    if (blk && blk.getStaticProps) {
                        bIPPromises.push(blk.getStaticProps({ ...context, locale, environment }));
                        continue;
                    }
                }
                bIPPromises.push(Promise.resolve({}));
            }
        } else {
            props.blocksData = null;
        }
        const blocksInitialProps = await Promise.all(bIPPromises);

        return {
            props: {
                ...props,
                locale,
                blocksInitialProps,
            },
        };
    }

    return {
        props: {},
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const environment = createRelayEnvironment({}, false);
    const { useLocaleInPath } = symbio.i18n;
    const paths: Array<string | { params: ParsedUrlQuery }> = [];
    // loop over all locales
    for (const locale in SiteLocale) {
        if (Object.prototype.hasOwnProperty.call(SiteLocale, locale)) {
            let cnt = -1;
            let done = 0;
            do {
                const { allPages, _allPagesMeta } = await fetchQuery<sPQ>(environment, staticPathsQuery, {
                    locale: getSiteLocale(locale),
                    first: 100,
                    skip: 0,
                });
                if (cnt === -1) {
                    cnt = Number(_allPagesMeta.count);
                }
                // loop over all pages
                for (const page of allPages) {
                    let url = String(page.url) === 'homepage' ? '' : '/' + page.url;
                    const localePrefix = useLocaleInPath ? '/' + locale : '';
                    const blockParams = await getStaticParamsFromBlocks(page.content, locale, environment);
                    if (blockParams.length > 0) {
                        for (const params of blockParams) {
                            for (const key in params) {
                                if (Object.prototype.hasOwnProperty.call(params, key)) {
                                    url = url?.replace(
                                        new RegExp('/:' + key + '(\\/|$)'),
                                        String('/' + params[key] + '$1'),
                                    );
                                }
                            }
                            paths.push(localePrefix + url);
                        }
                    } else {
                        paths.push(localePrefix + url);
                    }
                }

                done += allPages.length;
            } while (done < cnt);
        }
    }

    return {
        paths,
        fallback: true,
    };
};
