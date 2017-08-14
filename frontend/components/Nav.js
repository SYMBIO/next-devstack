import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    display: flex;
`;

export const NavItem = styled.div`
    padding: 0 0 0 15px;
    font-size: 20px;
    a {
        text-decoration: none;
        color: #333;
        text-decoration: ${ ({ isActive }) => isActive ? 'underline' : 'none'};
    }
`;

export default ({ children }) => (
    <Nav>{children}</Nav>
)