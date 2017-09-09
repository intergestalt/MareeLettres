import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

// route components
import Home from '../../ui/screens/Home.jsx';
import ChallengesIndex from '../../ui/screens/Challenges.jsx';
import Challenge from '../../ui/screens/Challenge.jsx';
import ContentPage from '../../ui/screens/Content.jsx';
import ConfigPage from '../../ui/screens/Config.jsx';
import StatusPage from '../../ui/screens/Status.jsx';
import LettersPage from '../../ui/screens/Letters.jsx';
import ProposalsPage from '../../ui/screens/Proposals.jsx';
import PlayersPage from '../../ui/screens/Players.jsx';
import FeedPage from '../../ui/screens/Feed.jsx';
import ReviewPage from '../../ui/screens/Review.jsx';

const renderRoutes = () =>
  <Router history={browserHistory}>
    <Redirect from="/" to="admin" />
    <Route path="admin">
      <IndexRoute component={Home} />
      <Route name="challenges.index" path="challenges" component={ChallengesIndex} />
      <Route name="challenges.show" path="challenges/:challenge_id" component={Challenge} />
      <Route name="proposals.index" path="proposals" component={ProposalsPage} />
      <Route name="players.index" path="players" component={PlayersPage} />
      <Route name="content.edit" path="content" component={ContentPage} />
      <Route name="status" path="status" component={StatusPage} />
      <Route name="letters" path="letters" component={LettersPage} />
      <Route name="config" path="config" component={ConfigPage} />
      <Route name="feed" path="feed" component={FeedPage} />
      <Route name="review" path="review" component={ReviewPage} />
    </Route>
  </Router>;

export default renderRoutes;

//       <Route path="lists/:id" component={ListPageContainer}/>
