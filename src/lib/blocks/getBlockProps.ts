import { GetStaticPropsContext } from 'next';
import getBlockName from '../../utils/getBlockName';
import BlockRegistry from './BlockRegistry';
import { Providers } from '../../types/provider';
import { i18n } from '../../../symbio.config.json';

export const getBlocksProps = async (
    context: GetStaticPropsContext,
    providers: Providers,
): Promise<{
    props: { [key: string]: unknown };
    revalidate: number;
}> => {
    const provider = providers.page;
    const locale = context.locale || i18n.defaultLocale;
    const slug = context.params?.slug;
    const props = await provider.getPageBySlug(locale, Array.isArray(slug) ? slug : slug ? [slug] : ['homepage']);
    const blocksPropsPromises = [];
    if (props.blocksData && props.blocksData.length > 0) {
        for (const block of props.blocksData) {
            const blockName = getBlockName(block);
            if (blockName && BlockRegistry.has(blockName)) {
                const blk = BlockRegistry.get(blockName);
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
        const blk = BlockRegistry.get('SubpageListBlock');
        if (blk && blk.getStaticProps) {
            blocksPropsPromises.push(
                blk.getStaticProps({ ...context, locale, page: props.page, block: {}, providers }),
            );
        }
    }
    const blocksProps = await Promise.all(blocksPropsPromises);

    return {
        props: {
            ...props,
            locale,
            blocksProps,
        },
        revalidate: 1,
    };
};
