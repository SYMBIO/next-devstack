import React, { ReactElement, ReactNode } from 'react';
import condCls from '../../../utils/conditionalClasses';
import styles from './BlockWrapper.module.scss';

export interface BlockWrapperProps {
    tooltip: string;
    children?: ReactNode;
    className?: string;
    marginTop?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginBottom?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginLeft?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginRight?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const BlockWrapper = ({
    children,
    className,
}: BlockWrapperProps): ReactElement<BlockWrapperProps, 'div'> | null => {
    return <div className={condCls(styles.block, className)}>{children}</div>;
};
