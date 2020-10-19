import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { BlockType } from '../../types/block';
import getBlockName from '../../utils/getBlockName';
import { Providers } from '../../types/provider';
import { i18n, ssg } from '../../../symbio.config.json';

export const getBlocksProps = async (
    context: GetStaticPropsContext,
    providers: Providers,
    blocks: Record<string, BlockType>,
): Promise<GetStaticPropsResult<{ [key: string]: unknown }>> => {
    const provider = providers.page;
    const locale = context.locale || i18n.defaultLocale;
    const slug = context.params?.slug;
    const props = await provider.getPageBySlug(locale, Array.isArray(slug) ? slug : slug ? [slug] : ['homepage']);
    const blocksPropsPromises = [];
    const notFound = !props.page || undefined;

    if (props.blocksData && props.blocksData.length > 0) {
        for (const block of props.blocksData) {
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
        return {
            props: {
                ...props,
                locale,
                blocksProps,
            },
            revalidate: ssg.staticGeneration ? false : ssg.revalidate,
            unstable_notFound: notFound,
        };
    } catch (e) {
        if (e.code === 'ENOENT') {
            return {
                props: {
                    ...props,
                    locale,
                    blocksProps: [],
                },
                revalidate: ssg.staticGeneration ? false : ssg.revalidate,
                unstable_notFound: true,
            };
        } else {
            throw e;
        }
    }
};
