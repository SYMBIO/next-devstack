import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import Greeting from 'components/Greeting';
import Logo from 'components/Logo';

const HomeGreeting = styled.div`
    margin: 0 0 10px 0;
`;

export default () => (
    <Container>
        <HomeGreeting>
            <Greeting/>
        </HomeGreeting>
        <Logo large/>
    </Container>
);