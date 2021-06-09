import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './PageBox.module.scss';
import { Link } from '../../primitives/Link/Link';

export interface PageBoxProps {
    page: {
        __typename: 'PageRecord';
        id: string;
        title: string;
        url: string;
    };
    className?: string;
}

const PageBox = ({ page, className }: PageBoxProps): ReactElement => {
    return (
        <Link page={page} className={clsx(styles.box, className)}>
            <strong className={styles.heading}>{page.title}</strong>
        </Link>
    );
};

PageBox.whyDidYouRender = true;

export { PageBox };