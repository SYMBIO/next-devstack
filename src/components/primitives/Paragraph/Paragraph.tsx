import React, { ReactElement, ReactNode } from 'react';
import styles from './Paragraph.module.scss';

export interface ParagraphI {
    children: ReactNode;
}

const Paragraph = ({ children }: ParagraphI): ReactElement<ParagraphI, 'p'> | null => {
    return <p className={styles.paragraph}>{children}</p>;
};

Paragraph.whyDidYouRender = true;

export { Paragraph };
