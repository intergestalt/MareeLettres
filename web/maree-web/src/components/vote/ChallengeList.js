import React from 'react';
import { translate } from 'react-i18next';
import ChallengeHeaderContent from './ChallengeHeaderContent';
import './style.css';
import { isFinished } from '../../helper/dateFunctions.js'

class ChallengeList extends React.Component {

	renderChallenges() {
		let challenges = [];
		let lastFinished = false;
		for(let i = this.props.challenges.length - 1; i >= 0; i--) { // iterate backwards
			let c = this.props.challenges[i];
			let finished = isFinished(c);
			let onlyFinishedToShow = false;
			if(finished && !lastFinished) {
				challenges.push(
					<li key={"toggle-button"} onClick={this.props.toggleFinished} className="toggle-past">{this.props.showFinished ? 
						this.props.i18n.t('close_past_challenges') : this.props.i18n.t('open_past_challenges')}
					</li>
				);
				onlyFinishedToShow = true;
			}
			challenges.push(
				<li 
					onClick={()=>{this.props.onSelectChallenge(c)}} 
					key={c._id} 
					className={(c.winningProposal || c.winningProposalDetailImageUrl ? "withImage" : "") + (finished && !onlyFinishedToShow ? " hideFinished" : "")}
				>
					<ChallengeHeaderContent
						challenge={c}
						tickerData={this.props.tickerData[c._id]}
					/>
					{c.winningProposal && !c.winningProposalDetailImageUrl? (
					<div className="winningProposalMockup">{c.winningProposal.text}</div>
					) : null}
					{c.winningProposalDetailImageUrl ? (
						<img className="winning-image" src={c.winningProposalDetailImageUrl} alt="winning image"/>
					) : null}
				</li>
			);
			lastFinished = finished;
		}
		challenges.reverse();
		return (
			<ul className={"challenge-list" + (this.props.showFinished ? "" : " hide-finished")}>{challenges}</ul>
		);
	}

	render() {
	    return (
	       <div className="height100">
	       	{this.props.loading || this.props.loadingProposals ? (
	       		<div className="height100 challenge-list-loading">{this.props.i18n.t("loading")}</div>
	       	) : (
	       		<div className="height100">{this.renderChallenges()}</div>
	       	)}
	       </div>
	    );
	}
}

export default translate()(ChallengeList);