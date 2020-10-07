import React, { ReactElement } from 'react';
import BlockRegistry from '../../../lib/blocks/BlockRegistry';
import getBlockName from '../../../utils/getBlockName';

interface BlocksProps {
    blocks: readonly any[] | null;
    initialProps?: any[];
}

export const Blocks = ({ blocks, initialProps }: BlocksProps): ReactElement => (
    <>
        {blocks?.map((block, i) => {
            const blockName = getBlockName(block);
            if (!blockName || !BlockRegistry.has(blockName)) {
                return null;
            }
            const BlockComponent = BlockRegistry.get(blockName);
            const blockInitialProps = (initialProps && initialProps[i]) || {};
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <BlockComponent key={`block_${i}`} content={block} {...blockInitialProps} />
            );
        })}{' '}
    </>
);
