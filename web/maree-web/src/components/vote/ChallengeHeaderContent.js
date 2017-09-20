import React from 'react';
import { translate } from 'react-i18next';
import { getTickerString } from '../../helper/dateFunctions.js';

class ChallengeHeaderContent extends React.Component {
	
	renderTickerData(tickerData) {
		if(tickerData) {
			if(tickerData.finished) {
				return <div>{this.props.i18n.language === "en" ? tickerData.endStringEn : tickerData.endStringFr}</div>;
			} else {
				return <div>{getTickerString(tickerData.timeLeft)}<span>{this.props.i18n.t("live")}</span></div>;	
			}
			
		}
		return "no data";
	}

	render() {
	    return (
	    	<div>
	       		<div onClick={()=>{this.props.onClick(this.props.challenge)}}>{this.props.challenge.title[this.props.i18n.language]}</div>
				<div>{this.renderTickerData(this.props.tickerData)}</div>
			</div>
	    );
	}
}

export default translate()(ChallengeHeaderContent);