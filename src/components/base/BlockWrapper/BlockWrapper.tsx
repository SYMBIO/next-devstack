import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Container, { ContainerProps } from 'react-bootstrap/Container';
import condCls from '../../../utils/conditionalClasses';
import styles from './BlockWrapper.module.scss';

export interface BlockWrapperProps extends ContainerProps {
    tooltip?: string;
}

export const BlockWrapper = ({ children, tooltip, className, ...props }: BlockWrapperProps): ReactElement => {
    return (
        <Container {...props} className={condCls(className, styles.wrapper)}>
            {children}
        </Container>
    );
};
