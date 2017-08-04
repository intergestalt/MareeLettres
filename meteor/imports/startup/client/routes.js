import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

// route components
import Home from '../../ui/screens/Home.jsx';
import ChallengesIndex from '../../ui/screens/Challenges.jsx';
import Challenge from '../../ui/screens/Challenge.jsx';
import ContentPage from '../../ui/screens/Content.jsx';

export const renderRoutes = () =>
  <Router history={browserHistory}>
    <Redirect from="/" to="admin" />
    <Route path="admin">
      <IndexRoute component={Home} />
      <Route path="challenges" component={ChallengesIndex} />
      <Route path="challenges/:challenge_id" component={Challenge} />
      <Route path="content" component={ContentPage} />
    </Route>
  </Router>;

//       <Route path="lists/:id" component={ListPageContainer}/>
