import React from 'react';
import { translate } from 'react-i18next';
import InfoColumn from '../../info/InfoColumn';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import ChallengeContainer from '../../vote/ChallengeContainer';
import NewsFeed from '../../news/NewsFeed';
import FluxMap from '../../fluxmap/Map.js';
import './App.css';
import { serverUri } from '../../../config/config.js';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

const urlPropsQueryConfig = {
  screenId: { type: UrlQueryParamTypes.number }
};
const axios = require('axios');

let shuffleString = function (str) {
  return str
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      mapExpansion: 0,
      mapExpansionClassname: "flux",
      activeMenu: 0,
      splash: true,
      splashText: "M" + shuffleString("ARÉE") + " D" + shuffleString("ES") + " L" + shuffleString("ETTRES"),
      config: null,
      currentScreen: "message"
    }
    this.expandMap = this.expandMap.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.removeSplash = this.removeSplash.bind(this);
    this.shiftScreenType = this.shiftScreenType.bind(this);
    this.loadConfig = this.loadConfig.bind(this);
  }

  loadConfig() {
    let requestUri = serverUri + '/api/config';
    console.log("loading config at " + requestUri);
    axios.get(requestUri)
      .then(response=>{
        try {
          console.log(response.data.config);
          this.setState({config: response.data.config});
        }
        catch(err) {
          console.log(err);
        }
        
      })
      .catch(error=>{
        console.log(error);
      });
  }

  expandMap() {
    console.log("expandMap clicked");
    switch(this.state.mapExpansion) {
      case 0: this.setState({mapExpansion: 1, mapExpansionClassname: "flux_expanded_1"}); break;
      case 1: this.setState({mapExpansion: 2, mapExpansionClassname: "flux_expanded_2"}); break;
      default: this.setState({mapExpansion: 0, mapExpansionClassname: "flux"}); break;

    }
  }
  
  menuClick(item) {
    console.log(item);
    this.setState({activeMenu: item});
  }

  removeSplash() {
    this.setState({splash: false});
  }

  shiftScreenType() {
    if(this.state.config && this.props.screenId) {
      // next screen depends on what is allowed in config
      let nextScreen = {
        message: this.state.config.screens_show_vote ? "vote" : (this.state.config.screens_show_flux ? "flux" : "message"),
        vote: this.state.config.screens_show_flux ? "flux" : (this.state.config.screens_show_message ? "message" : "vote"),
        flux: this.state.config.screens_show_message ? "message" : (this.state.config.screens_show_vote ? "vote" : "flux"),
      }
      //console.log("shifting screen to " + nextScreen[this.state.currentScreen]);
      this.setState({currentScreen: nextScreen[this.state.currentScreen]});
    }
  }

  componentDidMount() {
    this.loadConfig();  
    setInterval(this.loadConfig, 30000);

    if(this.props.screenId) {
      setInterval(this.shiftScreenType, 20000); // screen mode, shift screen content
    } else {
      setTimeout(this.removeSplash, 10000); // web mode, remove splash
    }
  }

  render() {
    let message = "";
    if(this.state.config) {
      if(this.state.config["screen_" + this.props.screenId + "_message"]) {
        message = this.state.config["screen_" + this.props.screenId + "_message"];
        message = message.toUpperCase();
      }
    } 
    return (
      <div className="App">

        {this.props.screenId ? ( 
          <div style={{display: "flex", flexDirection: "column", height: "100%"}}>          
            <div 
              style={{display: this.state.currentScreen === "message" ? "flex" : "none" }}
              className="splash" 
            >{message}</div>
            <ChallengeContainer
              display={this.state.currentScreen === "vote" ? "block" : "none"}
              screenMode={true}
            />
            <FluxMap
              display={this.state.currentScreen === "flux" ? "block" : "none"}
              mapExpansion={2}
              config={this.state.config}
              screenId={this.props.screenId}
            />
          </div>
        ) : null}
        
        {!this.props.screenId ? (
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>          
          
          {this.state.splash ? (
            <div onClick={this.removeSplash} className="splash">{this.state.splashText}</div> ) 
          : null}
        
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
                <div className="titleImage">{this.state.splashText}</div>
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
            {!this.props.screenId && this.state.mapExpansion < 2 ? (
              <section className={"news" + (this.state.activeMenu === 2 ? " active" : "")}>
                <NewsFeed/>
              </section>
            ) : null}  
            {<section className={this.state.mapExpansionClassname + (this.state.activeMenu === 3 ? " active" : "")}>
              <FluxMap
                expandMap={this.expandMap}
                mapExpansion={this.state.mapExpansion}
                config={this.state.config}
              />
            </section>}
          </div>

        </div> 
        ) : null}

      </div>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(translate()(App));
