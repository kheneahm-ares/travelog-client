import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Container, Grid, Segment } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { ActivityModal } from "./activities/ActivityModal";
import { loadTravelPlan } from "./detailSlice";
import { TravelPlanActivities } from "./activities/TravelPlanActivities";
import { TravelPlanDetailHeader } from "./TravelPlanDetailHeader";
import { TravelPlanDetailInfo } from "./TravelPlanDetailInfo";
import { TravelPlanDetailSidebar } from "./TravelPlanDetailSidebar";
import { openModal } from "./activities/activitySlice";
import { Link } from "react-router-dom";
import { InviteModal } from "./InviteModal";

interface IProps extends RouteComponentProps<{ id: string }> {}

export const TravelPlanDetails: React.FC<IProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { travelPlan, loadingPlan, deletingTravelPlan } = useSelector(
    (state: RootState) => state.detailReducer
  );
  const [loading, setLoading] = useState(true);
  const travelPlanId = match.params.id;

  useEffect(() => {
    dispatch(loadTravelPlan(travelPlanId)).then(() => {
      setLoading(false);
    });

    return () => {
      setLoading(true);
    };
  }, [dispatch, travelPlanId]);


  function handleAdd()
  {
    dispatch(openModal(null))
  }

  if (loadingPlan || loading) {
    return <LoadingComponent content="Loading Travel Plan" />;
  } else if (deletingTravelPlan) {
    return <LoadingComponent content="Deleting Travel Plan" />;
  } else {
    return (
      <Grid>
        <ActivityModal travelPlanId={travelPlan?.id!} />
        <InviteModal />
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
              onClick={handleAdd}
            />
            <Button
              as={Link}
              to={`/travelplans/map/${travelPlanId}`}
              floated="right"
              content="Map"
              color="twitter"
              icon="world"
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
            <TravelPlanActivities travelPlanId={travelPlan?.id!} />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
};
