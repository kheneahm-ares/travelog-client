import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Grid, Segment } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { MapSidebar } from "./MapSidebar";
import {
  getActivitiesByDate,
  getActivitiesMappedById,
  loadTravelPlanActivities,
  resetState,
} from "./mapSlice";
import MapView from "./MapView";

interface IProps extends RouteComponentProps<{ id: string }> {}

export const TravelPlanMap: React.FC<IProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { travelPlanActivities } = useSelector(
    (state: RootState) => state.mapReducer
  );
  const mapActivities = useSelector(getActivitiesMappedById());

  const { loadingActivities } = useSelector(
    (state: RootState) => state.mapReducer
  );
  useEffect(() => {
    dispatch(loadTravelPlanActivities(match.params.id)).then((result: any) => {
      if (result.error) {
        toast.error(result.error.message);
      }
    });
    return function cleanup() {
      dispatch(resetState());
    };
  }, [dispatch, match.params.id]);

  if (loadingActivities || travelPlanActivities.length === 0) {
    return <LoadingComponent content="Loading Map" />;
  }

  return (
    <Grid>
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
      <Grid.Column width={5} style={{ minWidth: "320px" }}>
        <MapSidebar
          travelPlanActivities={travelPlanActivities}
          mapActivities={mapActivities}
        />
      </Grid.Column>
      <Grid.Column width={11} style={{ height: "650px" }}>
        <MapView travelPlanActivities={travelPlanActivities} />
      </Grid.Column>
    </Grid>
  );
};
