import React from 'react';
import { translate } from 'react-i18next';
import ChallengeHeaderContent from './ChallengeHeaderContent';
import './style.css';
import { VoteMarkPanel } from './VoteMark';

class ChallengeProposalList extends React.Component {
	
	renderProposals() {
		let proposals = this.props.proposals.map(p => {return ( 
			<li className="proposal-list-entry" key={p._id}>
				<div className="proposal-list-title">{p.text}</div>
				<VoteMarkPanel
					yes_amount={p.yes_votes}
					no_amount={p.no_votes}
				/>
			</li>
		)});
		return <ul className="proposal-list">{proposals}</ul>;
	}

	render() {
		return (
	       <div className="challenge-proposal-list-container">
	       		<div className="chalenge-proposal-list-header" onClick={this.props.onReset}>
	       			{this.props.showPrev ? (
	       				<div className="challenge-left" onClick={this.props.onPrev}>{'<'}</div>
	       			) : (<div className="challenge-left"></div>)}
		       		<ChallengeHeaderContent
		       			challenge={this.props.challenge}
		       			tickerData={this.props.tickerData}
		       		/>
		       		{this.props.showNext ? (
		       			<div className="challenge-right" onClick={this.props.onNext}>{'>'}</div>
		       		) : (<div className="challenge-right"></div>)}
	       		</div>
	       		
       			<div className="proposal-list-header">
       				<span className={this.props.proposalSortMode == 0 ? "active" : ""} onClick={()=>{this.props.changeProposalSortMode(0)}}>{this.props.i18n.t("sort_top")}</span>
       				&nbsp;&nbsp;|&nbsp;&nbsp;<span className={this.props.proposalSortMode == 1 ? "active" : ""} onClick={()=>{this.props.changeProposalSortMode(1)}}>{this.props.i18n.t("sort_new")}</span>
       				&nbsp;&nbsp;|&nbsp;&nbsp;<span className={this.props.proposalSortMode == 2 ? "active" : ""} onClick={()=>{this.props.changeProposalSortMode(2)}}>{this.props.i18n.t("sort_trend")}</span>
       			</div>

       			{this.props.loadingProposals ? (
	       			<div className="loading">{this.props.i18n.t("loading")}</div>
	       		) : (
	       			<div className="proposal-list-container">
	       				{this.renderProposals()}
						<div>{this.props.proposalsLimit === this.props.proposals.length ? (
       						<div className="load-more" onClick={this.props.loadMore}>{this.props.i18n.t("load_more")}</div>
       					) : null}</div>
	       			</div>
       			)}
	       		
	       		
	       </div>
	    );
	}
}

export default translate()(ChallengeProposalList);