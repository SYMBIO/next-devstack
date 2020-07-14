import React, { ReactElement } from 'react';
import styles from './PageBox.module.scss';
import { Link } from '..';
import condCls from '../../utils/conditionalClasses';

export interface PageBoxProps {
    page: {
        __typename: 'PageRecord';
        id: string;
        title: string;
        url: string;
    };
    className?: string;
}

export const PageBox = ({ page, className }: PageBoxProps): ReactElement => {
    return (
        <Link page={page} className={condCls(styles.box, className)}>
            <strong className={styles.heading}>{page.title}</strong>
        </Link>
    );
};
