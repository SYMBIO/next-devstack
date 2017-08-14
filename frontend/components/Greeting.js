import React from 'react';
import styled from 'styled-components';
import { media } from '_utils/mixins';

const Text = styled.p`
    font-size: 16px;
    ${ media.desktop`
        font-size: 24px;
    `}
`;

const Highlight = styled.strong`
    color: #00d8ff;
    font-weight: 700;
`;

export default () => (
    <Text>
        <Highlight>Next </Highlight>devstack
    </Text>
);
