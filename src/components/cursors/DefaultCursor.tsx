import React, { ReactElement } from 'react';
import styles from './DefaultCursor.module.scss';
import condCls from '../../utils/conditionalClasses';

interface DefaultCursorProps {
    readonly className?: string;
}

export const DefaultCursor = ({ className }: DefaultCursorProps): ReactElement | null => {
    return <div className={condCls(styles.wrapper, className)}></div>;
};
