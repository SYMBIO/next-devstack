import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 10px;
    border: 0;
    font-size: 16px;
    color: #fff;
    background-color: #999;
    cursor: pointer;
    outline: none;
    transition: all 300ms ease;
    &:hover {
        background-color: #888;
    }
`;

export default ({ children, ...props}) => (
    <Button type='button' {...props} >{children}</Button>
)