import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { Logger } from '../../services';
import { BlockType } from '../../types/block';
import getBlockName from '../../utils/getBlockName';
import { Providers } from '../../types/provider';
import { ssg } from '../../../symbio.config.json';

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
        if (slug[0] === context.locale) {
            return slug.slice(1);
        }
        return slug;
    }
    if (slug && slug !== context.locale) {
        return [slug];
    }
    return ['homepage'];
}

/**
 * Get static props for current page and it's blocks
 * @param {GetStaticPropsContext} context
 * @param {Providers} providers
 * @param {Record<string, BlockType>} blocks
 * @returns {Promise<GetStaticPropsResult<{[p: string]: unknown}>>}
 */
export const getBlocksProps = async (
    context: GetStaticPropsContext,
    providers: Providers,
    blocks: Record<string, BlockType>,
): Promise<GetStaticPropsResult<{ [key: string]: unknown }>> => {
    const provider = providers.page;
    const locale = context.locale || context.defaultLocale;
    const props = await provider.getPageBySlug(locale, getNormalizedSlug(context));
    const notFound = !props.page || undefined;

    if (props.redirect && props.redirect.to && typeof props.redirect.permanent === 'boolean') {
        Logger.info('Matched redirect ' + props.redirect.from + ' -> ' + props.redirect.to);
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

    const blocksPropsPromises = [];
    if (props.page?.content && props.page.content.length > 0) {
        for (const block of props.page.content) {
            const blockName = getBlockName(block);
            if (blockName && Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                const blk = blocks[blockName];
                if (blk && blk.getStaticProps) {
                    blocksPropsPromises.push(
                        blk.getStaticProps({ ...context, locale, page: props.page, block, providers }),
                    );
                    continue;
                }
            }
            blocksPropsPromises.push(Promise.resolve({}));
        }
    } else {
        const blk = blocks.SubpageListBlock;
        if (blk && blk.getStaticProps) {
            blocksPropsPromises.push(
                blk.getStaticProps({ ...context, locale, page: props.page, block: {}, providers }),
            );
        }
    }

    try {
        const blocksProps = await Promise.all(blocksPropsPromises);
        notFound && Logger.warn('Forwarding to 404');
        return {
            props: {
                ...props,
                locale,
                blocksProps,
                preview: !!context.preview,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            notFound,
        };
    } catch (e) {
        if (e.code === 'ENOENT') {
            Logger.warn('Forwarding to 404');
            return {
                props: {
                    ...props,
                    locale,
                    blocksProps: [],
                    preview: !!context.preview,
                },
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                notFound: true,
            };
        } else {
            throw e;
        }
    }
};
