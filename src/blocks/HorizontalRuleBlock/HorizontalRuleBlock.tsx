import React, { ReactElement } from 'react';
import { HorizontalRule, BlockWrapper } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './HorizontalRuleBlock.module.scss';

function HorizontalRuleBlock(): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'HorizontalRuleBlock'} className={styles.wrapper}>
            <HorizontalRule />
        </BlockWrapper>
    );
}

HorizontalRuleBlock.whyDidYouRender = true;

BlockRegistry.set('HorizontalRuleBlock', HorizontalRuleBlock);
