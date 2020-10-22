import React, { ReactElement } from 'react';
import styles from './PageBox.module.scss';
import condCls from '../../../utils/conditionalClasses';
import { Link } from '../../primitives/Link/Link';

export interface PageBoxProps {
    page: {
        __typename: string;
        id: string;
        title: string;
        url: string;
    };
    className?: string;
}

const PageBox = ({ page, className }: PageBoxProps): ReactElement => {
    return (
        <Link page={page} className={condCls(styles.box, className)}>
            <strong className={styles.heading}>{page.title}</strong>
        </Link>
    );
};

PageBox.whyDidYouRender = true;

export { PageBox };
