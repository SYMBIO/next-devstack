import React from 'react';
import BlockFactory from '../../lib/blocks/BlockFactory';

interface BlocksProps {
    blocks: any[] | null;
    initialProps?: any[];
}

export const Blocks = ({ blocks, initialProps }: BlocksProps) => (
    <>
        {blocks?.map((block, i) => {
            const blockName = block?.__typename?.replace('Record', 'Block');
            if (!blockName || !BlockFactory.has(blockName)) {
                return null;
            }
            const BlockComponent = BlockFactory.get(blockName);
            const blockInitialProps = (initialProps && initialProps[i]) || {};
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                <BlockComponent key={`block_${i}`} content={block} {...blockInitialProps} />
            );
        })}{' '}
    </>
);
