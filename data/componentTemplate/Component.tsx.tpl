import React, { ReactNode } from 'react';
import styles from './{NAME}.module.scss';
import condCls from '../../../utils/conditionalClasses';

interface Props {
    children: ReactNode;
    className?: string;
}

const {NAME} = ({ children, className }: Props): JSX.Element => {
    return (
        <div className={condCls(styles.wrapper, className)}>
            {children}
        </div>
    )
};

{NAME}.whyDidYouRender = true;

export { {NAME} };
