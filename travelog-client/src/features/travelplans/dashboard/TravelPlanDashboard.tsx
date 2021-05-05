import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Divider, Grid, Header } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { loadUserTravelPlansAsync } from "./dashboardSlice";
import { TravelPlanBody } from "./TravelPlanBody";
import { TravelPlanStatusFilter } from "./TravelPlanStatusFilter";

export const TravelPlanDashboard = () => {
  console.log('dash');
  return (
    <Grid>
      <Grid.Column width={10}>
        <Header size='huge' textAlign='center' >Travel Plans</Header>
        <TravelPlanStatusFilter/>
        <Divider />
      </Grid.Column>
      <Grid.Column width={10}>
        <TravelPlanBody/>
      </Grid.Column>
    </Grid>
  );
};
