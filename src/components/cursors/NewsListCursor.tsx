import React, { ReactElement } from 'react';
import styles from './NewsListCursor.module.scss';
import condCls from '../../utils/conditionalClasses';

interface NewsListCursorProps {
    className?: string;
}

export const NewsListCursor = (): ReactElement => {
    return <div className={condCls(styles.wrapper)}>NewsList Cursor</div>;
};
