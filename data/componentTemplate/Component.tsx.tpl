import React, { ReactNode } from 'react';
import styles from './{NAME}.module.scss';
import condCls from '../../../utils/conditionalClasses';

interface VideoComponentProps {
    children: ReactNode;
    className?: string;
}

const {NAME} = ({ children, className }: VideoComponentProps): JSX.Element => {
    return (
        <div className={condCls(styles.wrapper, className)}>
            {children}
        </div>
    )
};

{NAME}.whyDidYouRender = true;

export { {NAME} };
