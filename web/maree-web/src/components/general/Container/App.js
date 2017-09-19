import React from 'react';
import { translate } from 'react-i18next';
import InfoColumn from '../../InfoColumn/InfoColumn';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ChallengeList from '../../ChallengeList/ChallengeList';
import NewsFeed from '../../NewsFeed/NewsFeed';
import FluxMap from '../../Map/Map';
import './App.css';

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <section className="info">
          <div className="sectionHeader">INFO</div>
          <img src="assets/title.png" alt="title"/>
          <LanguageSelector/>
          <InfoColumn/>
        </section>
        <section className="vote">
          <div className="sectionHeader">VOTE</div>
          <ChallengeList/>
        </section>
        <section className="news">
          <div className="sectionHeader">NEWS</div>
          <NewsFeed/>
        </section>
        <section className="flux">
          <div className="sectionHeader">FLUX</div>
          <FluxMap/>
        </section>
      </div>
    );
  }
}

export default translate()(App);
