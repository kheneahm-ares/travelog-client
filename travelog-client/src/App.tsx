import React, { Fragment } from 'react';
import {Route, withRouter} from 'react-router-dom';

import './App.css';
import { SignInCallBack } from './features/auth/SignInCallBack';
import { HomePage } from './features/home/HomePage';

function App() {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin-oidc" component={SignInCallBack} />

    </Fragment>

  );
}

export default withRouter(App);
