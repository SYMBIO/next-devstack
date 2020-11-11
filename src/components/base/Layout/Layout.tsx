import React, { ReactElement, ReactNode } from 'react';
import { CustomCursor } from '../../primitives/CustomCursor/CustomCursor';
import styles from './Layout.module.scss';
import { DefaultCursor } from '../../cursors/DefaultCursor';

interface LayoutProps {
    children: ReactNode;
}

const LayoutComponent = ({ children }: LayoutProps): ReactElement | null => {
    return (
        <CustomCursor component={DefaultCursor}>
            {(ref) => (
                <div className={styles.grid} ref={ref}>
                    {children}
                </div>
            )}
        </CustomCursor>
    );
};

export const Layout = LayoutComponent;
