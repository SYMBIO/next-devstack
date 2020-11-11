import React, { ReactElement } from 'react';
import styles from './DefaultCursor.module.scss';
import condCls from '../../utils/conditionalClasses';

interface DefaultCursorProps {
    className?: string;
}

export const DefaultCursor = ({ className }: DefaultCursorProps): ReactElement => {
    return <div className={condCls(styles.wrapper, className)}></div>;
};
