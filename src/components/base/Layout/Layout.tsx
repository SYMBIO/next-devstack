import React, { ReactNode } from 'react';
import { ContainerProps } from 'react-bootstrap';

export const Layout = (props: ContainerProps): ReactNode => {
    return props.children;
};
