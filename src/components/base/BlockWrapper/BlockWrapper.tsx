import React, { ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Container, { ContainerProps } from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import condCls from '../../../utils/conditionalClasses';
import styles from './BlockWrapper.module.scss';

export interface BlockWrapperProps extends ContainerProps {
    tooltip?: string;
}

export const BlockWrapper = ({ children, tooltip, className, ...props }: BlockWrapperProps): ReactElement => {
    return (
        <Container {...props} className={condCls(className, styles.wrapper)}>
            <Row>
                <Col>{children}</Col>
            </Row>
        </Container>
    );
};
