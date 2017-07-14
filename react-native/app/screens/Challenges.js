import React from 'react';
import { View, StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { ChallengesList } from '../components/ChallengesList';
import { Header } from '../components/Header';

export default () =>
  <Container>
    <StatusBar />
    <Header />
    <ChallengesList />
  </Container>;
