import React, { ReactElement, ReactNode } from 'react';
import styles from './Paragraph.module.scss';

interface ParagraphProps {
    children: ReactNode;
}

export const Paragraph = ({ children }: ParagraphProps): ReactElement<ParagraphProps, 'p'> | null => {
    return <p className={styles.paragraph}>{children}</p>;
};
