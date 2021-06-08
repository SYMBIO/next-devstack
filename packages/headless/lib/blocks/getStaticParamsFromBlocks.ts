import { ParsedUrlQuery } from 'querystring';
import { BasePage, Providers } from '@symbio/cms';
import { BlockType } from '../../types/block';
import getBlockName from '../../utils/getBlockName';

export async function getStaticParamsFromBlocks<P extends BasePage, W>(
    content: ReadonlyArray<{ __typename: string } | null> | null,
    locale: string,
    providers: Providers<P, W>,
    blocks: Record<string, BlockType<P, W>>,
): Promise<ParsedUrlQuery[]> {
    if (!content) {
        return [];
    }

    let blockParams: ParsedUrlQuery[] = [];
    for (const block of content) {
        const blockName = getBlockName(block);
        if (blockName && Object.prototype.hasOwnProperty.call(blocks, blockName)) {
            const blk = blocks[blockName];
            if (blk && blk.getStaticPaths) {
                const newParams = await blk.getStaticPaths(locale, providers);
                if (blockParams.length === 0) {
                    blockParams.push(...newParams);
                } else {
                    blockParams = blockParams.reduce((acc: ParsedUrlQuery[], val) => {
                        for (const newParam of newParams) {
                            acc.push({ ...val, ...newParam });
                        }
                        return acc;
                    }, []);
                }
            }
        }
    }

    return blockParams;
}
