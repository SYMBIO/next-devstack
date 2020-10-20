import React, { ReactElement, ReactNode } from 'react';
import styles from './Blockquote.module.scss';

export interface BlockquoteI {
    children: ReactNode | string;
}

const Blockquote = ({ children }: BlockquoteI): ReactElement<BlockquoteI, 'div'> | null => {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
};

Blockquote.whyDidYouRender = true;

export { Blockquote };
