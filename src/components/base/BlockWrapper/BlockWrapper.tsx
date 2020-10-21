import React, { ReactElement } from 'react';
import { Row, Col, RowProps } from 'react-bootstrap';

export interface BlockWrapperProps extends RowProps {
    tooltip?: string;
}

export const BlockWrapper = ({ children, ...props }: BlockWrapperProps): ReactElement => {
    return (
        <Row {...props}>
            <Col>{children}</Col>
        </Row>
    );
};
