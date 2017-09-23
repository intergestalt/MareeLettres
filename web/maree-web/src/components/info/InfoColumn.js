import React from 'react';
import ReactMarkdown from 'react-markdown';
import { serverUri } from '../../config/config.js'
import { translate } from 'react-i18next';
import './style.css';

const axios = require('axios');

class InfoColumn extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true
		};
	}

	componentWillMount() {
		axios.get(serverUri + '/api/content')
  		.then(response=>{
  			try {
	  			response.data.content.forEach(item=>{
	    			if(item._id === "web") {
	    				this.setState({content: item, loading: false});
	    			}
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

	render() {
	    return (
	       <div className="info-container">
	       	{this.state.loading ? (
	       		<div>{this.props.i18n.t("loading")}</div>
	       	) : (
	       		<ReactMarkdown source={this.state.content[this.props.i18n.language]}/>
	       	)}
	       </div>
	    );
	}
}

export default translate()(InfoColumn);