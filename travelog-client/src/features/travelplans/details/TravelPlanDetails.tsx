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
import { TravelPlanDetailHeader } from "./TravelPlanDetailHeader";
import { TravelPlanDetailInfo } from "./TravelPlanDetailInfo";
import { TravelPlanDetailSidebar } from "./TravelPlanDetailSidebar";

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

      <Grid.Row>
        <Grid.Column width={10}>
          <TravelPlanDetailHeader travelPlan={travelPlan!} />
          <TravelPlanDetailInfo travelPlan={travelPlan!} />
        </Grid.Column>
        <Grid.Column width={6}>
          <TravelPlanDetailSidebar
            travelers={travelPlan?.travelers!}
            creatorId={travelPlan?.createdById!}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Column width={16}>
        <Segment basic>
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
        </Segment>
      </Grid.Column>
      <Grid.Column width={16}>
        <Container
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            height: "auto",
            paddingBottom: "10px",
          }}
        >
          <TravelPlanActivities travelPlanId={travelPlan!.id} />
        </Container>
      </Grid.Column>
    </Grid>
  );
};
