import React, { ReactElement } from 'react';
import styles from './Layout.module.scss';
import withCustomCursor from '../HOC/withCustomCursor';
import { DefaultCursor } from '../../cursors/DefaultCursor';

interface LayoutProps {
    children: ReactElement;
}

const LayoutComponent = ({ children }: LayoutProps): ReactElement<LayoutProps, 'div'> | null => {
    return <div className={styles.grid}>{children}</div>;
};

export const Layout = withCustomCursor(LayoutComponent, DefaultCursor);
