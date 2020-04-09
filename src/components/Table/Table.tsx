import React, { ReactElement, ReactNode } from 'react';
import styles from './Table.module.scss';

interface TableProps {
    readonly children: ReactNode;
}

export const Table = ({ children }: TableProps): ReactElement<TableProps, 'div'> => {
    return (
        <div className={styles.overflowWrapper}>
            <table className={styles.table}>{children}</table>
        </div>
    );
};
