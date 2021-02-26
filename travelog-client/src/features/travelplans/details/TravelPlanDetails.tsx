import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, RouteProps } from "react-router";
import { Container, Grid, Segment } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { ActivityModal } from "./ActivityModal";
import { loadTravelPlan } from "./detailSlice";
import { TravelPlanActivities } from "./TravelPlanActivities";

interface IProps extends RouteComponentProps<{ id: string }> {}

// const gridStyles = {
//   overflow-x: ''
// }

export const TravelPlanDetails: React.FC<IProps> = ({ match, history }) => {
  const dispatch = useAppDispatch();
  const { travelPlan, isLoading } = useSelector(
    (state: RootState) => state.detailReducer
  );

  useEffect(() => {
    dispatch(loadTravelPlan(match.params.id));
  }, [dispatch, match.params.id]);

  if (isLoading) {
    return <LoadingComponent content="Loading Travel Plan" />;
  }

  return (
    <Grid>
    <ActivityModal/>

      <Grid.Row width={12}>
        <div>{travelPlan?.name}!</div>
        <div>{travelPlan?.id}!</div>
      </Grid.Row>
      <Grid.Row style={{ overflowX: "auto", whiteSpace: "nowrap", height: "800px" }}> 
        <Container>
          <TravelPlanActivities travelPlanId={travelPlan!.id} />
        </Container>
      </Grid.Row>
    </Grid>
  );
};
