import React from 'react';
import { translate } from 'react-i18next';
import InfoColumn from '../../info/InfoColumn';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ChallengeContainer from '../../vote/ChallengeContainer';
import NewsFeed from '../../news/NewsFeed';
import FluxMap from '../../Map/Map.js';
import './App.css';

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <div className="headers">
          <div className="borderRight">INFO</div>
          <div className="borderRight">VOTE</div>
          <div className="borderRight">NEWS</div>
          <div>FLUX</div>
        </div>
        <div className="mainContent">
          <section className="info">
            <img src="assets/title.png" alt="title"/>
            <LanguageSelector/>
            <InfoColumn/>
          </section>
          <section className="vote">
            <ChallengeContainer/>
          </section>
          <section className="news">
            <NewsFeed/>
          </section>
          <section className="flux">
            <FluxMap/>
          </section>
        </div>
      </div>
    );
  }
}

export default translate()(App);
