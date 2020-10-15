import { ParsedUrlQuery } from 'querystring';
import { BlockType } from '../../types/block';
import getBlockName from '../../utils/getBlockName';
import { Providers } from '../../types/provider';

export async function getStaticParamsFromBlocks(
    content: ReadonlyArray<{ __typename: string } | null> | null,
    locale: string,
    providers: Providers,
    blocks: Record<string, BlockType>,
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
