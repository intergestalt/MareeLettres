import React from 'react';
import { translate } from 'react-i18next';

import ChallengeHeaderContent from './ChallengeHeaderContent';

class ChallengeList extends React.Component {
	
	renderChallenges() {
		let challenges = this.props.challenges.map(c => {return (
			<li key={c._id}>
				<ChallengeHeaderContent
					challenge={c}
					tickerData={this.props.tickerData[c._id]}
					onClick={()=>{this.props.onSelectChallenge(c)}}
				/>
			</li>
		)});
		return (
			<ul>{challenges}</ul>
		);
	}

	render() {
	    return (
	       <div>
	       	{this.props.loading ? (
	       		<div>{this.props.i18n.t("loading")}</div>
	       	) : (
	       		<div>{this.renderChallenges()}</div>
	       	)}
	       </div>
	    );
	}
}

export default translate()(ChallengeList);