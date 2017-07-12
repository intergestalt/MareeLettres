import React from 'react';
import { View, StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { HomeIntro } from '../components/HomeIntro';

export default () => (
    <Container>
        <StatusBar />
        <HomeIntro />
    </Container>
);