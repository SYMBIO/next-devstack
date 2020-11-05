import React, { ReactElement, ReactNode } from 'react';
import styles from './Layout.module.scss';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): ReactElement<LayoutProps, 'div'> | null => {
    return (
        <div className={styles.grid}>
            {children}
            <CustomCursor />
        </div>
    );
};
