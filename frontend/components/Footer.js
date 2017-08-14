import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #999;
    color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
`;

export default ({ children }) => (
    <Footer>{children}</Footer>
)