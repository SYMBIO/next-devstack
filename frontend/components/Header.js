import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    height: 50px;
    padding: 0 20px 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export default ({ children }) => (
    <Header>{children}</Header>
)