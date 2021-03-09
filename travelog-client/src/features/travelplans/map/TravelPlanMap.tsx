import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Grid } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { MapSidebar } from "./MapSidebar";
import { getActivitiesByDate, getActivitiesMappedById, loadTravelPlanActivities } from "./mapSlice";
import MapView from "./MapView";

interface IProps extends RouteComponentProps<{ id: string }> {}

export const TravelPlanMap: React.FC<IProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const groupedActivities = useSelector(getActivitiesByDate());
  const mapActivities = useSelector(getActivitiesMappedById());
  
  const { loadingActivities } = useSelector(
    (state: RootState) => state.mapReducer
  );
  useEffect(() => {
    dispatch(loadTravelPlanActivities(match.params.id));
  }, [dispatch, match.params.id]);

  if (loadingActivities) {
    return <LoadingComponent content="Loading Map" />;
  }

  return (
    <Grid style={{ height: "800px" }}>
      <Grid.Column width={4}>
        <MapSidebar groupedActivities={groupedActivities} mapActivities={mapActivities} />
      </Grid.Column>
      <Grid.Column width={12}>
        <MapView groupedActivities={groupedActivities} />
      </Grid.Column>
    </Grid>
  );
};
