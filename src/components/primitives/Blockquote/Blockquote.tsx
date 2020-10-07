import React, { ReactElement, ReactNode } from 'react';
import styles from './Blockquote.module.scss';

interface Props {
    children: ReactNode;
}

const Blockquote = ({ children }: Props): ReactElement<Props, 'div'> | null => {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
};

Blockquote.whyDidYouRender = true;

export { Blockquote };
