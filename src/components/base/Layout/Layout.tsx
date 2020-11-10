import React, { ReactElement, useState } from 'react';
import styles from './Layout.module.scss';
import withCustomCursor from '../HOC/withCustomCursor';
import { DefaultCursor } from '../../cursors/DefaultCursor';
import { CursorContext } from '../../../contexts/cursor-context/CursorContext';
import { cursorDefaultValue } from '../../../contexts/cursor-context/CursorContext';

interface LayoutProps {
    children: ReactElement;
}

const LayoutComponent = ({ children }: LayoutProps): ReactElement<LayoutProps, 'div'> | null => {
    const [state, setState] = useState<any>(cursorDefaultValue.state);
    return (
        <CursorContext.Provider value={{ state, setState }}>
            <div className={styles.grid}>{children}</div>
        </CursorContext.Provider>
    );
};

export const Layout = withCustomCursor(LayoutComponent, DefaultCursor);
