import React, { ReactElement, ReactNode } from 'react';
import styles from './Layout.module.scss';

interface Props {
    children: ReactNode;
}

export const Layout = ({ children }: Props): ReactElement<Props, 'div'> | null => {
    return <div className={styles.grid}>{children}</div>;
};
