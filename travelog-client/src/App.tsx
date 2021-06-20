import React, { Fragment } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";

import { PrivateRoute } from "./app/layout/PrivateRoute";
import { SignInCallBack } from "./features/auth/SignInCallBack";
import { SignInSilentCallback } from "./features/auth/SignInSilentCallback";
import { HomePage } from "./features/home/HomePage";
import { NavBar } from "./features/nav/NavBar";
import { TravelPlanInvitations } from "./features/profile/invitations/TravelPlanInvitations";
import { TravelPlanDashboard } from "./features/travelplans/dashboard/TravelPlanDashboard";
import { TravelPlanDetails } from "./features/travelplans/details/TravelPlanDetails";
import { TravelPlanManage } from "./features/travelplans/manage/TravelPlanManage";
import { TravelPlanMap } from "./features/travelplans/map/TravelPlanMap";

import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import NotFound from "./app/layout/NotFound";
import Forbidden from "./app/layout/Forbidden";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />

      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin-oidc" component={SignInCallBack} />
      <Route
        exact
        path="/auth/signin-silent-oidc"
        component={SignInSilentCallback}
      />
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
                  <PrivateRoute
                    exact
                    path="/travelplans/map/:id"
                    component={TravelPlanMap}
                  />
                  <PrivateRoute
                    exact
                    path="/profile/invitations/"
                    component={TravelPlanInvitations}
                  />
                  <Route exact path="/forbidden" component={Forbidden} />

                  <Route component={NotFound} />
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
