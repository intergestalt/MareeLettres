import React from 'react';
import './style.css';
import TwitterTimeline from 'react-twitter-embedded-timeline';

class NewsFeed extends React.Component {
	
	render() {
	    return (
          //<TwitterTimeline user="mareedeslettres" chrome="nofooter noheader"/>
	       <iframe src="/twitter/TwitterWebView.html"/>
	    );
	}
}

export default NewsFeed;