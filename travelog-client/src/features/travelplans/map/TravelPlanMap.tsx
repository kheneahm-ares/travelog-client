import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Button, Grid, Segment } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { MapSidebar } from "./MapSidebar";
import {
  getActivitiesByDate,
  getActivitiesMappedById,
  loadTravelPlanActivities,
} from "./mapSlice";
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
      <Grid.Row>
        <Grid.Column>
          <Button
            as={Link}
            to={`/travelplans/${match.params.id}`}
            floated="left"
            content="Go To Travel Plan"
            color="twitter"
            icon="calendar alternate outline"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column width={4}>
        <MapSidebar
          groupedActivities={groupedActivities}
          mapActivities={mapActivities}
        />
      </Grid.Column>
      <Grid.Column width={12}>
        <MapView groupedActivities={groupedActivities} />
      </Grid.Column>
    </Grid>
  );
};
