import React from 'react';
import { translate } from 'react-i18next';
import { serverUri } from '../../config/config.js'

const axios = require('axios');

class ChallengeList extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true
		};
	}

	componentWillMount() {
		axios.get(serverUri + '/api/challenges')
  		.then(response=>{
  			try {
	  			this.setState({challenges: response.data.challenges, loading: false});
	  		}
	  		catch(err) {
	  			console.log(err);
	  		}
    		
  		})
  		.catch(error=>{
    		console.log(error);
  		});
	}

	renderChallenges() {
		let challenges = this.state.challenges.map(c => {return (<li key={c._id}>{c.title[this.props.i18n.language]}</li>)});
		return (
			<ul>{challenges}</ul>
		);
	}

	render() {
	    return (
	       <div>
	       	{this.state.loading ? (
	       		<div>{this.props.i18n.t("loading")}</div>
	       	) : (
	       		<div>{this.renderChallenges()}</div>
	       	)}
	       </div>
	    );
	}
}

export default translate()(ChallengeList);