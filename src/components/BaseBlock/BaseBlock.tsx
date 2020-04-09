import React, { ReactElement, ReactNode } from 'react';
import styles from './BaseBlock.module.scss';

export interface BaseBlockProps {
    // @TODO: specify relay response data
    content: any;
    children: ReactNode;
    marginTop?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginBottom?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginLeft?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    marginRight?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const BaseBlock = ({ children }: BaseBlockProps): ReactElement<BaseBlockProps, 'div'> | null => (
    <div className={styles.block}>{children}</div>
);
