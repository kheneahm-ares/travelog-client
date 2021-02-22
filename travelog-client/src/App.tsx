import React, { Fragment } from 'react';
import {Route, withRouter} from 'react-router-dom';

import './App.css';
import { PrivateRoute } from './app/layout/PrivateRoute';
import { SignInCallBack } from './features/auth/SignInCallBack';
import { HomePage } from './features/home/HomePage';
import { TravelPlanDashboard } from './features/travelplans/dashboard/TravelPlanDashboard';

function App() {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin-oidc" component={SignInCallBack} />
      <PrivateRoute exact path="/travelplans" component={TravelPlanDashboard} />

    </Fragment>

  );
}

export default withRouter(App);
