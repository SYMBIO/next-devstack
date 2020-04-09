import React, { ReactElement } from 'react';
import { ReactNode } from 'react';
import styles from './Heading.module.scss';

export interface HeadingProps {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: ReactNode;
}

export const Heading = ({ tag, children }: HeadingProps): ReactElement<HeadingProps, HeadingProps['tag']> | null => {
    const CustomTag = tag;

    return <CustomTag className={styles.heading}>{children}</CustomTag>;
};
