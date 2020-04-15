import React, { ReactElement } from 'react';
import { HorizontalRule, BlockWrapper } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../../types/block';
import styles from './HorizontalRuleBlock.module.scss';

function HorizontalRuleBlock(): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'HorizontalRuleBlock'} className={styles.wrapper}>
            <HorizontalRule />
        </BlockWrapper>
    );
}

BlockFactory.set('HorizontalRuleBlock', HorizontalRuleBlock);
