import React, { ReactElement } from 'react';
import getBlockName from '@symbio/headless/dist/utils/getBlockName';
import { AppContextProps } from '@symbio/headless/dist/types/appContext';
import { BlocksPropsMap } from '@symbio/headless/dist/types/block';
import blocks from '../../../blocks';
import { WebSettingsProps } from '../../../types/webSettings';
import { PageProps } from '../../../types/page';

export interface BlocksProps {
    blocksData: readonly any[] | null;
    initialProps?: BlocksPropsMap;
    app: AppContextProps<PageProps, WebSettingsProps>;
}

export const Blocks = ({ blocksData, initialProps, app }: BlocksProps): ReactElement => (
    <>
        {blocksData?.map((block, i) => {
            const blockName = getBlockName(block);
            if (!blockName || !Object.prototype.hasOwnProperty.call(blocks, blockName)) {
                return null;
            }
            const BlockComponent = blocks[blockName];
            const blockInitialProps =
                initialProps && Object.prototype.hasOwnProperty.call(initialProps, block.id)
                    ? initialProps[block.id]
                    : undefined;
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <BlockComponent key={`block_${i}`} content={block} {...blockInitialProps} app={app} />
            );
        })}
    </>
);
