import React, { ReactElement, ReactNode } from 'react';
import styles from './BlockWrapper.module.scss';

export interface BlockWrapperProps {
    // @TODO: specify relay response data
    children?: ReactNode;
    marginTop?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginBottom?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginLeft?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginRight?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const BlockWrapper = ({ children }: BlockWrapperProps): ReactElement<BlockWrapperProps, 'div'> | null => (
    <div className={styles.block}>{children}</div>
);
