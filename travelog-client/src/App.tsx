import React, { Fragment } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { Container } from "semantic-ui-react";

import { PrivateRoute } from "./app/layout/PrivateRoute";
import { SignInCallBack } from "./features/auth/SignInCallBack";
import { HomePage } from "./features/home/HomePage";
import { NavBar } from "./features/nav/NavBar";
import { TravelPlanDashboard } from "./features/travelplans/dashboard/TravelPlanDashboard";
import { TravelPlanDetails } from "./features/travelplans/details/TravelPlanDetails";
import { TravelPlanManage } from "./features/travelplans/manage/TravelPlanManage";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin-oidc" component={SignInCallBack} />
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
                  <PrivateRoute
                    key={location.key}
                    path={["/travelplans/edit/:id", "/create/travelplan"]}
                    component={TravelPlanManage}
                  />
                  <PrivateRoute
                    exact
                    path="/travelplans/:id"
                    component={TravelPlanDetails}
                  />
                </Switch>
              </Container>
            </Fragment>
          );
        }}
      />
    </Fragment>
  );
};

export default withRouter(App);
