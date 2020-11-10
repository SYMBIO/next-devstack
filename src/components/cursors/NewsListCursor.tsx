import React, { ReactElement } from 'react';
import styles from './NewsListCursor.module.scss';
import condCls from '../../utils/conditionalClasses';

interface NewsListCursorProps {
    readonly className?: string;
}

export const NewsListCursor = ({ className }: NewsListCursorProps): ReactElement | null => {
    return <div className={condCls(styles.wrapper, className)}></div>;
};
