import React, { ReactNode } from 'react';
import { Container, ContainerProps } from 'react-bootstrap';

export const Layout = (props: ContainerProps): ReactNode => {
    return props.children;
};
