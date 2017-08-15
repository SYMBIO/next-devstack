import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import Greeting from 'components/Greeting';
import Button from 'components/Button';
import Logo from 'components/Logo';

const HomeGreeting = styled.div`
    margin: 0 0 10px 0;
`;

const HomeAction = styled.div`
    margin: 30px 0 0 0;
`;

const HomeMessage = styled.div`
    margin: 15px 0 0 0;
    font-size: 20px;
`;

export default ({ _getData, message }) => (
    <Container>
        <HomeGreeting>
            <Greeting/>
        </HomeGreeting>
        <Logo large/>
        <HomeAction>
            <Button onClick={_getData}>Get data from API</Button>
        </HomeAction>
        <HomeMessage>{message}</HomeMessage>
    </Container>
);