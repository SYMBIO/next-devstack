import React, { ReactElement } from 'react';
import getBlockName from '@symbio/headless/dist/utils/getBlockName';
import blocks from '../../../blocks';

export interface BlocksProps {
    blocksData: readonly any[] | null;
    initialProps?: any[];
}

export const Blocks = ({ blocksData, initialProps }: BlocksProps): ReactElement => (
    <>
        {blocksData?.map((block, i) => {
            const blockName = getBlockName(block);
            if (!blockName || !Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                return null;
            }
            const BlockComponent = blocks[blockName];
            const blockInitialProps = (initialProps && initialProps[i]) || {};
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <BlockComponent key={`block_${i}`} content={block} {...blockInitialProps} />
            );
        })}
    </>
);
