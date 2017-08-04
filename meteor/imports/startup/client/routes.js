import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

// route components
import Home from '../../ui/screens/Home.jsx';
import ChallengesIndex from '../../ui/screens/Challenges.jsx';
import Challenge from '../../ui/screens/Challenge.jsx';
import ContentPage from '../../ui/screens/Content.jsx';
import StatusPage from '../../ui/screens/Status.jsx';

const renderRoutes = () =>
  <Router history={browserHistory}>
    <Redirect from="/" to="admin" />
    <Route path="admin">
      <IndexRoute component={Home} />
      <Route name="challenges.index" path="challenges" component={ChallengesIndex} />
      <Route name="challenges.show" path="challenges/:challenge_id" component={Challenge} />
      <Route name="content.edit" path="content" component={ContentPage} />
      <Route name="status" path="status" component={StatusPage} />
    </Route>
  </Router>;

export default renderRoutes;

//       <Route path="lists/:id" component={ListPageContainer}/>
