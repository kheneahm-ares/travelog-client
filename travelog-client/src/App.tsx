import React, { Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "./App.css";
import { PrivateRoute } from "./app/layout/PrivateRoute";
import { SignInCallBack } from "./features/auth/SignInCallBack";
import { HomePage } from "./features/home/HomePage";
import { NavBar } from "./features/nav/NavBar";
import { TravelPlanDashboard } from "./features/travelplans/dashboard/TravelPlanDashboard";

function App() {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => {
          return (
            <Fragment>
              <NavBar />
              <Container style={{ marginTop: "7em" }}>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/travelplans"
                    component={TravelPlanDashboard}
                  />
                  <Route
                    exact
                    path="/auth/signin-oidc"
                    component={SignInCallBack}
                  />
                </Switch>
              </Container>
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
}

export default withRouter(App);
