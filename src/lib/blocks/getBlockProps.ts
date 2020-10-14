import { ParsedUrlQuery } from 'querystring';
import getBlockName from '../../utils/getBlockName';
import BlockRegistry from './BlockRegistry';
import { Providers } from '../../types/provider';

export const getBlocksProps = async (
    context: {
        params?: ParsedUrlQuery;
        previewData?: unknown;
    },
    locale: string,
    pathParts: string | string[],
    providers: Providers,
    currentUrl: string,
): Promise<{
    props: { [key: string]: unknown };
    revalidate: number;
}> => {
    const provider = providers.page;
    const props = await provider.getPageBySlug(locale, Array.isArray(pathParts) ? pathParts : [pathParts]);
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
            currentUrl,
        },
        revalidate: 1,
    };
};
