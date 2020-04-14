import React, { ReactElement } from 'react';
import { ReactNode } from 'react';
import styles from './Heading.module.scss';

export interface HeadingProps {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    children: ReactNode;
}

export const Heading = ({
    tag,
    className,
    children,
}: HeadingProps): ReactElement<HeadingProps, HeadingProps['tag']> | null => {
    const CustomTag = tag;
    const classes = [styles.heading];
    className && classes.push(className);

    return <CustomTag className={classes.join(' ')}>{children}</CustomTag>;
};
