import { ParsedUrlQuery } from 'querystring';
import { BasePage } from '@symbio/cms';
import { BlockType } from '../../types/block';
import getBlockName from '../../utils/getBlockName';

export async function getStaticParamsFromBlocks<P extends BasePage, W, PR, L>(
    content: ReadonlyArray<{ __typename: string } | null> | null,
    locale: L,
    providers: PR,
    blocks: Record<string, BlockType<P, W, PR, L>>,
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
                    blockParams.push(
                        ...newParams.reduce<ParsedUrlQuery[]>((acc, curr) => {
                            if (typeof curr !== 'string') {
                                acc.push(curr.params);
                            }
                            return acc;
                        }, []),
                    );
                } else {
                    blockParams = blockParams.reduce((acc: ParsedUrlQuery[], val) => {
                        for (const newParam of newParams) {
                            if (typeof newParam !== 'string') {
                                acc.push({ ...val, ...newParam.params });
                            }
                        }
                        return acc;
                    }, []);
                }
            }
        }
    }

    return blockParams;
}
