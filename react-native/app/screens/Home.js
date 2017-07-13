import React from 'react';
import { View, StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { HomeIntro } from '../components/HomeIntro';
import { Header } from '../components/Header';

export default () => (
    <Container>
        <StatusBar />
        <Header />
        <HomeIntro />
    </Container>
);