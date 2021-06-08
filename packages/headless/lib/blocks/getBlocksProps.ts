import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { AppData, BasePage, Providers } from '@symbio/cms';
import { BlocksPropsMap, BlocksPropsPromisesMap, BlockType } from '../../types/block';
import getBlockName from '../../utils/getBlockName';

/**
 * Returns normalized (array-ized) slug.
 * If slug is empty, it means it's homepage.
 * If first item of slug array equalscurrent locale, remove it.
 * @param {GetStaticPropsContext} context
 * @returns {string[]}
 */
function getNormalizedSlug(context: GetStaticPropsContext): string[] {
    const slug = context.params?.slug;
    if (Array.isArray(slug)) {
        return slug;
    }
    if (slug) {
        return [slug];
    }
    return ['homepage'];
}

/**
 * Get static props for current page and it's blocks
 * @param {GetStaticPropsContext} context
 * @param {Providers} providers
 * @param {Record<string, BlockType>} blocks
 * @param ssg
 * @returns {Promise<GetStaticPropsResult<{[p: string]: unknown}>>}
 */
export const getBlocksProps = async <P extends BasePage, W>(
    context: GetStaticPropsContext,
    providers: Providers<P, W>,
    blocks: Record<string, BlockType<P, W>>,
    ssg: {
        staticGeneration: boolean;
        revalidate: boolean | number;
    },
): Promise<GetStaticPropsResult<{ [key: string]: unknown }>> => {
    if (!providers.page) {
        console.log(providers);
    }
    const provider = providers.page;
    const locale = context.locale || context.defaultLocale;
    const props = await provider.getPageBySlug(locale, getNormalizedSlug(context), context.preview);
    const slug = context.params?.slug;

    if (!props) {
        return {
            props: {
                locale,
                preview: !!context.preview,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            notFound: true,
        };
    }

    const notFound = (!props?.page && !props?.redirect) || undefined;

    if (props.redirect && props.redirect.to && typeof props.redirect.permanent === 'boolean') {
        return {
            props: {
                ...props,
                locale,
                preview: !!context.preview,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            redirect: {
                destination: props.redirect.to,
                permanent: props.redirect.permanent,
            },
        };
    }

    const blocksPropsPromises = getBlocksPropsPromises(props.page, locale, context, providers, blocks);

    try {
        const entries = Object.entries(blocksPropsPromises);
        const keys = entries.reduce<string[]>((acc, val) => {
            acc.push(val[0]);
            return acc;
        }, []);
        const values = await Promise.all(
            entries.reduce<Array<Promise<unknown>>>((acc, val) => {
                acc.push(val[1]);
                return acc;
            }, []),
        );
        const blocksPropsMap: BlocksPropsMap = {};
        for (let i = 0; i < values.length; i += 2) {
            blocksPropsMap[keys[i] as string] = values[i + 1];
        }
        return {
            props: {
                ...props,
                locale,
                blocksPropsMap,
                preview: !!context.preview,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            ...((slug && slug.length === 1 && slug[0] === '404') || !!props.page ? {} : { notFound }),
        };
    } catch (e) {
        if (e.code === 'ENOENT') {
            return {
                props: {
                    ...props,
                    locale,
                    blocksPropsMap: new Map(),
                    preview: !!context.preview,
                },
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                ...(slug && slug.length === 1 && slug[0] === '404' ? {} : { notFound: true }),
            };
        } else {
            throw e;
        }
    }
};

export function getBlocksPropsPromises<P extends BasePage, W>(
    page: AppData<P, W>['page'],
    locale: string | undefined,
    context: GetStaticPropsContext,
    providers: Providers<P, W>,
    blocks: Record<string, BlockType<P, W>>,
): BlocksPropsPromisesMap {
    const blocksPropsPromises: BlocksPropsPromisesMap = {};
    if (page?.content && page.content.length > 0) {
        for (const block of page.content) {
            const blockName = getBlockName(block);
            if (blockName && Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                const blk = blocks[blockName];
                if (blk.getStaticProps && block && block.__typename !== '%other') {
                    blocksPropsPromises[block.id] = blk.getStaticProps({
                        context,
                        locale,
                        page,
                        block,
                        providers,
                        blocks,
                    });
                }
            }
        }
    }

    return blocksPropsPromises;
}
