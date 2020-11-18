import React, { ReactElement, ReactNode } from 'react';
import condCls from '../../../utils/conditionalClasses';
import styles from './BlockWrapper.module.scss';

export interface BlockWrapperProps {
    tooltip: string;
    children?: ReactNode;
    className?: string;
}

export const BlockWrapper = ({ children, className }: BlockWrapperProps): ReactElement | null => {
    if (children || (Array.isArray(children) && children.length > 0)) {
        return <section className={condCls(styles.block, className)}>{children}</section>;
    }
    return null;
};
