import React, { ReactElement } from 'react';
import styles from './NewsListCursor.module.scss';
import commonStyles from '../primitives/CustomCursor/CustomCursor.module.scss';
import condCls from '../../utils/conditionalClasses';

interface NewsListCursorProps {
    className?: string;
}

export const NewsListCursor = ({ className }: NewsListCursorProps): ReactElement => {
    return <div className={condCls(commonStyles.cursor, styles.wrapper, className)}></div>;
};
