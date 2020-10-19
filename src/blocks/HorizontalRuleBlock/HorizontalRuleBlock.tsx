import React, { ReactElement } from 'react';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { BaseBlockProps } from '../../types/block';
import styles from './HorizontalRuleBlock.module.scss';
import { HorizontalRule } from '../../components/primitives/HorizontalRule/HorizontalRule';

function HorizontalRuleBlock(): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'HorizontalRuleBlock'} className={styles.wrapper}>
            <HorizontalRule />
        </BlockWrapper>
    );
}

HorizontalRuleBlock.whyDidYouRender = true;

export default HorizontalRuleBlock;
