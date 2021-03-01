import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, RouteProps } from "react-router";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { ActivityModal } from "./ActivityModal";
import { loadTravelPlan, openModal } from "./detailSlice";
import { TravelPlanActivities } from "./TravelPlanActivities";

interface IProps extends RouteComponentProps<{ id: string }> {}


export const TravelPlanDetails: React.FC<IProps> = ({ match, history }) => {
  const dispatch = useAppDispatch();
  const { travelPlan, isLoading } = useSelector(
    (state: RootState) => state.detailReducer
  );
  const travelPlanId = match.params.id;

  useEffect(() => {
    dispatch(loadTravelPlan(travelPlanId));
  }, [dispatch, travelPlanId]);

  if (isLoading) {
    return <LoadingComponent content="Loading Travel Plan" />;
  }

  return (
    <Grid>
      <ActivityModal />

      <Grid.Row width={12}>
        <div>{travelPlan?.name}!</div>
        <div>{travelPlan?.id}!</div>
      </Grid.Row>
      <Grid.Row>
        <Container>
          <h1 style={{ display: "inline", verticalAlign: "middle" }}>
            Activities
          </h1>
          <Button
            floated="right"
            positive
            style={{ display: "inline" }}
            icon="plus"
            onClick={() => dispatch(openModal(null))}
          />
        </Container>
      </Grid.Row>
      <Grid.Row width={12}>
        <Container
          style={{ overflowX: "auto", whiteSpace: "nowrap", height: "800px" }}
        >
          <TravelPlanActivities travelPlanId={travelPlan!.id} />
        </Container>
      </Grid.Row>
    </Grid>
  );
};
