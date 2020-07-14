import { ParsedUrlQuery } from 'querystring';
import BlockRegistry from '../blocks/BlockRegistry';
import getBlockName from '../../utils/getBlockName';

export async function getStaticParamsFromBlocks(
    blocks: ReadonlyArray<{ __typename: string } | null> | null,
    locale: string,
): Promise<ParsedUrlQuery[]> {
    if (!blocks) {
        return [];
    }

    let blockParams: ParsedUrlQuery[] = [];
    for (const block of blocks) {
        const blockName = getBlockName(block);
        if (blockName && BlockRegistry.has(blockName)) {
            const blk = BlockRegistry.get(blockName);
            if (blk && blk.getStaticPaths) {
                const newParams = await blk.getStaticPaths(locale);
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
