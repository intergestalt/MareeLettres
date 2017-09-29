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
      mapExpansionClassname: "flux",
      activeMenu: 0
    }
    this.expandMap = this.expandMap.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }

  expandMap() {
    console.log("expandMap clicked");
    switch(this.state.mapExpansion) {
      case 0: this.setState({mapExpansion: 1, mapExpansionClassname: "flux_expanded_1"}); break;
      case 1: this.setState({mapExpansion: 2, mapExpansionClassname: "flux_expanded_2"}); break;
      case 2: this.setState({mapExpansion: 0, mapExpansionClassname: "flux"}); break;
    }
  }
  
  menuClick(item) {
    console.log(item);
    this.setState({activeMenu: item});
  }

  render() {
    return (
      <div className="App">
        <div className="headers">
          {this.state.mapExpansion < 1 ? (
            <div className={"borderRight" + (this.state.activeMenu === 0 ? " active" : "")} onClick={()=>this.menuClick(0)}>INFO</div>
          ) : null}
          {this.state.mapExpansion < 2 ? (
            <div className={"borderRight" + (this.state.activeMenu === 1 ? " active" : "")} onClick={()=>this.menuClick(1)}>VOTE</div>
          ) : null}
          {this.state.mapExpansion < 2 ? (
            <div className={"borderRight" + (this.state.activeMenu === 2 ? " active" : "")} onClick={()=>this.menuClick(2)}>NEWS</div>
          ) : null}  
          <div className={this.state.mapExpansionClassname + (this.state.activeMenu === 3 ? " active" : "")} onClick={()=>this.menuClick(3)}>FLUX</div>
        </div>
        <div className="mainContent">
          {this.state.mapExpansion < 1 ? (
            <section className={"info" + (this.state.activeMenu === 0 ? " active" : "")}>
              <img src="assets/title.png" alt="title"/>
              <div className="store-icons">
                <a href="https://itunes.apple.com/fr/app/mar%C3%A9e-des-lettres/id1286369338"><img className="apple" src="assets/store_icons/apple_en.svg" alt="apple appstore icon"/></a>
                <a href="https://play.google.com/store/apps/details?id=fr.paris.mareedeslettres"><img className="google" src="assets/store_icons/google-play-badge_en.png" alt="google play store icon"/></a>
              </div>
              <LanguageSelector/>
              <InfoColumn/>
            </section>
          ) : null}
          {this.state.mapExpansion < 2 ? (
            <section className={"vote" + (this.state.activeMenu === 1 ? " active" : "")}>
              <ChallengeContainer/>
            </section>
          ) : null}  
          {this.state.mapExpansion < 2 ? (
            <section className={"news" + (this.state.activeMenu === 2 ? " active" : "")}>
              <NewsFeed/>
            </section>
          ) : null}  
          {<section className={this.state.mapExpansionClassname + (this.state.activeMenu === 3 ? " active" : "")}>
            <FluxMap
              expandMap={this.expandMap}
              mapExpansion={this.state.mapExpansion}
            />
          </section>}
        </div>
      </div>
    );
  }
}

export default translate()(App);
