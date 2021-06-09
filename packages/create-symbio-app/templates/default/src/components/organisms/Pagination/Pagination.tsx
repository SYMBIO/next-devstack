import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.scss';
import { Link } from '../../primitives/Link/Link';

export interface PaginationProps {
    page?: number;
    total?: number;
    className?: string;
    callback: (page: number) => void;
}

function renderPagination(page: number, total: number, callback: (page: number) => void): ReactElement[] {
    const result = [];
    let start = Math.max(page - 2, 1);
    const end = Math.min(start + 5, total);
    start = Math.max(Math.min(end - 5, start), 1);
    for (let p = start; p <= end; p++) {
        if (p === page) {
            result.push(
                <li key={`PaginationItem-${p}`} className={clsx(styles.linkItem, styles.linkItemActive)}>
                    {p}
                </li>,
            );
        } else {
            result.push(
                <li key={`PaginationItem-${p}`} className={styles.linkItem}>
                    <Link
                        href={'?page=' + p}
                        onClick={(e): void => {
                            e.preventDefault();
                            callback(p);
                        }}
                    >
                        {p}
                    </Link>
                </li>,
            );
        }
    }
    return result;
}

const Pagination = ({ className, page = 1, total = 0, callback }: PaginationProps): ReactElement | null => {
    if (total <= 1) {
        return null;
    }

    return (
        <div className={clsx(styles.wrapper, className)}>
            {/*<Button btnType={'secondary'} small onClick={(): void => console.log('load')}>
                Načíst další
            </Button>*/}
            <ul className={styles.linksList}>{renderPagination(page, total, callback)}</ul>
        </div>
    );
};

Pagination.whyDidYouRender = true;

export { Pagination };
