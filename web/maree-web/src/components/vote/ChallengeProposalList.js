import React from 'react';
import { translate } from 'react-i18next';
import ChallengeHeaderContent from './ChallengeHeaderContent';

class ChallengeProposalList extends React.Component {
	
	renderProposals() {
		let proposals = this.props.proposals.map(p => {return ( 
			<li key={p._id}>{p.text} {p.score} {p.created_at} {p.score_trending}</li>
		)});
		return <ul>{proposals}</ul>;
	}

	render() {
		return (
	       <div>
	       		<div>
	       			{this.props.showPrev ? (
	       				<div onClick={this.props.onPrev}>{'<'}</div>
	       			) : null}
		       		<ChallengeHeaderContent
		       			challenge={this.props.challenge}
		       			tickerData={this.props.tickerData}
		       			onClick={this.props.onReset}
		       		/>
		       		{this.props.showNext ? (
		       			<div onClick={this.props.onNext}>{'>'}</div>
		       		) : null}
	       		</div>
	       		<div>
	       			<div>
	       				<span onClick={()=>{this.props.changeProposalSortMode(0)}}>{this.props.i18n.t("sort_top")}</span>
	       				<span onClick={()=>{this.props.changeProposalSortMode(1)}}>{this.props.i18n.t("sort_new")}</span>
	       				<span onClick={()=>{this.props.changeProposalSortMode(2)}}>{this.props.i18n.t("sort_trend")}</span>
	       				(sort mode: {this.props.proposalSortMode})
	       			</div>

		       		{this.props.loadingProposals ? (
		       			<div>{this.props.i18n.t("loading")}</div>
		       		) : (
		       			<div>
		       				{this.renderProposals()}
							<div>{this.props.proposalsLimit === this.props.proposals.length ? (
	       						<div onClick={this.props.loadMore}>{this.props.i18n.t("load_more")}</div>
	       					) : null}</div>
		       			</div>
	       			)}
	       		</div>
	       </div>
	    );
	}
}

export default translate()(ChallengeProposalList);