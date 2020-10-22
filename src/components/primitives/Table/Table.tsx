import React, { ReactElement, ReactNode } from 'react';
import styles from './Table.module.scss';

export interface TableI {
    readonly children: ReactNode;
}

const Table = ({ children }: TableI): ReactElement<TableI, 'div'> => {
    return (
        <div className={styles.overflowWrapper}>
            <table className={styles.table}>{children}</table>
        </div>
    );
};

Table.whyDidYouRender = true;

export { Table };
