import React from 'react';
import { translate } from 'react-i18next';
import InfoColumn from '../../info/InfoColumn';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ChallengeContainer from '../../vote/ChallengeContainer';
import NewsFeed from '../../news/NewsFeed';
import FluxMap from '../../fluxmap/Map.js';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      mapExpansion: 0,
      mapExpansionClassname: "flux"
    }
    this.expandMap = this.expandMap.bind(this);
  }

  expandMap() {
    console.log("expandMap clicked");
    switch(this.state.mapExpansion) {
      case 0: this.setState({mapExpansion: 1, mapExpansionClassname: "flux_expanded_1"}); break;
      case 1: this.setState({mapExpansion: 2, mapExpansionClassname: "flux_expanded_2"}); break;
      case 2: this.setState({mapExpansion: 0, mapExpansionClassname: "flux"}); break;
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="headers">
          {this.state.mapExpansion < 1 ? (
            <div className="borderRight">INFO</div>
          ) : null}
          {this.state.mapExpansion < 2 ? (
            <div className="borderRight">VOTE</div>
          ) : null}
          {this.state.mapExpansion < 2 ? (
            <div className="borderRight">NEWS</div>
          ) : null}  
          <div className={this.state.mapExpansionClassname}>FLUX</div>
        </div>
        <div className="mainContent">
          {this.state.mapExpansion < 1 ? (
            <section className="info">
              <img src="assets/title.png" alt="title"/>
              <div className="store-icons">
                <a href="#foo"><img className="apple" src="assets/store_icons/apple_en.svg" alt="apple appstore icon"/></a>
                <a href="#foo"><img className="google" src="assets/store_icons/google-play-badge_en.png" alt="google play store icon"/></a>
              </div>
              <LanguageSelector/>
              <InfoColumn/>
            </section>
          ) : null}
          {this.state.mapExpansion < 2 ? (
            <section className="vote">
              <ChallengeContainer/>
            </section>
          ) : null}  
          {this.state.mapExpansion < 2 ? (
            <section className="news">
              <NewsFeed/>
            </section>
          ) : null}  
          <section className={this.state.mapExpansionClassname}>
            <FluxMap
              expandMap={this.expandMap}
              mapExpansion={this.state.mapExpansion}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default translate()(App);
