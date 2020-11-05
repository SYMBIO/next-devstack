import React, { ReactElement, ReactNode } from 'react';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): ReactElement<LayoutProps, 'div'> | null => {
    return <div className={styles.grid}>{children}</div>;
};
