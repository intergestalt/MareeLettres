import React from 'react';
import { translate } from 'react-i18next';
import { getTickerString } from '../../helper/dateFunctions.js';
import './style.css';

class ChallengeHeaderContent extends React.Component {
	
	renderTickerData(tickerData) {
		if(tickerData) {
			if(tickerData.finished) {
				return <div className="ticker">{this.props.i18n.language === "en" ? tickerData.endStringEn : tickerData.endStringFr}</div>;
			} else {
				return <div className="ticker">{getTickerString(tickerData.timeLeft)}<span className="live-indicator">{this.props.i18n.t("live")}</span></div>;	
			}
			
		}
		return "loading...";
	}

	render() {
		let title = this.props.challenge.title[this.props.i18n.language];
		if(title) {
			title = title.toUpperCase();
		}
	    return (
	    	<div className="challenge-header-content" onClick={this.props.onClick ? this.props.onClick : null}>
	       		<div>{this.renderTickerData(this.props.tickerData)}</div>
	       		<div className="challenge-title">{title}</div>
			</div>
	    );
	}
}

export default translate()(ChallengeHeaderContent);