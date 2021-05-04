import getBlockName from '../../utils/getBlockName';
import { Providers } from '../../types/provider';
import { BlockType } from '../../types/block';
import { GetStaticPropsContext } from 'next';
import { blocksContent } from '../../blocks/__generated__/blocksContent.graphql';
import { OMIT_REFTYPE, Page } from '../../types/app';

export const getBlocksProps = (
    providers: Providers,
    blocks: Record<string, BlockType>,
    context: GetStaticPropsContext,
    content?: ReadonlyArray<OMIT_REFTYPE<blocksContent> | null> | null,
    page?: Page | null,
    locale?: string,
) => {
    const blocksPropsPromises = [];
    if (content && content.length > 0) {
        for (const block of content) {
            const blockName = getBlockName(block);
            if (blockName && Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                const blk = blocks[blockName];
                if (blk && blk.getStaticProps) {
                    blocksPropsPromises.push(blk.getStaticProps({ ...context, locale, page, block, providers }));
                    continue;
                }
            }
            blocksPropsPromises.push(Promise.resolve({}));
        }
    }
    return blocksPropsPromises;
};
