import { ParsedUrlQuery } from 'querystring';
import { Environment } from 'relay-runtime';
import BlockFactory from '../blocks/BlockFactory';
import { getSiteLocale } from '../routing/getSiteLocale';

export async function getStaticParamsFromBlocks(
    blocks: ReadonlyArray<{
        readonly __typename: string;
    } | null> | null,
    locale: string,
    environment: Environment,
): Promise<ParsedUrlQuery[]> {
    if (!blocks) {
        return [];
    }

    let blockParams: ParsedUrlQuery[] = [];
    for (const block of blocks) {
        const blockName = block?.__typename?.replace('Record', 'Block');
        if (blockName && BlockFactory.has(blockName)) {
            const blk = BlockFactory.get(blockName);
            if (blk && blk.getStaticPaths) {
                const newParams = await blk.getStaticPaths(getSiteLocale(locale), environment);
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
