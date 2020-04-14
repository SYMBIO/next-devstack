import React, { ReactElement, ReactNode } from 'react';
import isStaging from '../../utils/isStaging';
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
    tooltip,
    className,
}: BlockWrapperProps): ReactElement<BlockWrapperProps, 'div'> | null => {
    const classes = [styles.block, className];
    if (isStaging()) {
        classes.push(styles.staging);
    }
    return (
        <div className={classes.join(' ')}>
            {isStaging() && <div className={styles.info}>{tooltip}</div>}
            {children}
        </div>
    );
};
