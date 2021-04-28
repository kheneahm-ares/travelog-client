import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Divider, Grid, Header } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { loadUserTravelPlansAsync } from "./dashboardSlice";
import { TravelPlanList } from "./TravelPlanList";
import { TravelPlanListPlaceholder } from "./TravelPlanListPlaceholder";

export const TravelPlanDashboard = () => {
  const { isTravelPlansLoading, travelPlans } = useSelector(
    (state: RootState) => state.dashboardReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserTravelPlansAsync());
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Header size='huge' textAlign='center' >Travel Plans</Header>
        <Divider />
      </Grid.Column>
      <Grid.Column width={10}>
        {isTravelPlansLoading ? (
          <TravelPlanListPlaceholder />
        ) : (
          <TravelPlanList />
        )}
      </Grid.Column>
    </Grid>
  );
};
