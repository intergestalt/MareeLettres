import React from 'react';
import { translate } from 'react-i18next';
import { serverUri } from '../../config/config.js';

import ChallengeList from './ChallengeList';
import ChallengeProposalList from './ChallengeProposalList';

import { getTickerDataChallenges } from '../../helper/dateFunctions.js';

const axios = require('axios');

const sortModes = ['popular', 'newest', 'trending'];
const proposalsBatchSize = 50;

class ChallengeContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			loadingChallenges: true,
      loadingProposals: false,
			challenges: [],
			tickerData: {},
			proposals: [],
			proposalSortMode: 0,
      proposalsLimit: proposalsBatchSize, // get from server config
		  showLoadMore: true,
      showChallengeList: true,
      showFinished: false,
    };

		this.selectChallenge = this.selectChallenge.bind(this);
		this.resetChallengeList = this.resetChallengeList.bind(this);
		this.previousChallenge = this.previousChallenge.bind(this);
		this.nextChallenge = this.nextChallenge.bind(this);
		this.changeProposalSortMode = this.changeProposalSortMode.bind(this);
    this.loadMoreProposals = this.loadMoreProposals.bind(this);
    this.toggleFinished = this.toggleFinished.bind(this);
	}

	selectChallenge(challenge) {
		this.loadProposals(challenge);
  	}

  	previousChallenge() {
  		if(this.state.selectedChallengeIndex > 0) {
  			let newIndex = this.state.selectedChallengeIndex - 1;
  			this.loadProposals(this.state.challenges[newIndex]);
  		}
  	}

  	nextChallenge() {
  		if(this.state.selectedChallengeIndex < this.state.challenges.length - 1) {
  			let newIndex = this.state.selectedChallengeIndex + 1;  			
  			this.loadProposals(this.state.challenges[newIndex]);
  		}
  	}

  	resetChallengeList() {
    	this.setState({showChallengeList: true, selectedChallenge: null, selectedChallengeIndex: -1, reloadProposals: true});
  	}

    toggleFinished() {
      this.setState({showFinished: !this.state.showFinished});
    }
  
	componentWillMount() {
		let requestUri = serverUri + '/api/challenges';
		console.log(requestUri);
		axios.get(requestUri)
  		.then(response=>{
  			try {
  				let challenges = response.data.challenges;
  				let challengeIds = challenges.map(c=>c._id); 
	  			this.setState({challenges: challenges, challengeIds: challengeIds, loadingChallenges: false});
	  		}
	  		catch(err) {
	  			console.log(err);
	  		}
    		
  		})
  		.catch(error=>{
    		console.log(error);
  		});

  		this.timerID = setInterval(() => {
	      this.updateTickerData();
	    }, 
	    1000);    
	}

	loadProposals(challenge, sortMode=0, limit=0) {
    if(limit === 0) {
      limit = proposalsBatchSize;
    }
		let requestUri = serverUri + '/api/challenges/' + challenge._id + '/proposals?sort=' + sortModes[sortMode] + '&limit=' + limit
		console.log(requestUri);
		this.setState({loadingProposals: true});
		axios.get(requestUri)
  		.then(response=>{
  			try {
  				let index = this.state.challengeIds.indexOf(challenge._id);
    			this.setState({
            showChallengeList: false,
    				selectedChallenge: challenge, 
    				selectedChallengeIndex: index,
    				loadingProposals: false,
    				proposals: response.data.proposals,
    				showPrev: index > 0,
    				showNext: index < this.state.challenges.length - 1,
    				proposalSortMode: sortMode,
            proposalsLimit: limit
    			});
	  		}
	  		catch(err) {
	  			console.log(err);
	  		}
  		})
  		.catch(error=>{
    		console.log(error);
  		});
	}

	changeProposalSortMode(mode) {
		this.loadProposals(this.state.selectedChallenge, mode);
	}

  loadMoreProposals() {
    this.loadProposals(this.state.selectedChallenge, this.state.proposalSortMode, this.state.proposalsLimit + proposalsBatchSize);
  }

	componentWillUnmount() {
	   clearInterval(this.timerID);
	}

	updateTickerData() {
		if(this.state.challenges && !this.state.loading) {
			let newTickerData = getTickerDataChallenges(this.state, this.state.tickerData);
			this.setState({tickerData: newTickerData});	
		}
	}

	render() {
	    return (
	    	<div className="height100">
			{this.state.showChallengeList ? (
            	<ChallengeList 
            		loading={this.state.loadingChallenges} 
                loadingProposals={this.state.loadingProposals}
            		challenges={this.state.challenges} 
            		tickerData={this.state.tickerData}
            		onSelectChallenge={this.selectChallenge}
                toggleFinished={this.toggleFinished}
                showFinished={this.state.showFinished}
            	/>
          	) : null}
      {this.state.selectedChallenge ? (
            	<ChallengeProposalList
            		challenge={this.state.selectedChallenge} 
            		tickerData={this.state.tickerData[this.state.selectedChallenge._id]}
            		onReset={this.resetChallengeList}
            		showPrev={this.state.showPrev}
            		onPrev={this.previousChallenge}
            		showNext={this.state.showNext}
            		onNext={this.nextChallenge}
            		loadingProposals={this.state.loadingProposals}
            		proposals={this.state.proposals}
            		proposalSortMode={this.state.proposalSortMode}
            		proposalsLimit={this.state.proposalsLimit}
                changeProposalSortMode={this.changeProposalSortMode}
                loadMore={this.loadMoreProposals}
            	/>
            ) : null}
          </div>
	    );
	}
}

export default translate()(ChallengeContainer);