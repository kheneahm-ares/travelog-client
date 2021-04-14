import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Container, Grid, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
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
import { InviteModal } from "./invite/InviteModal";

interface IProps extends RouteComponentProps<{ id: string }> {}

export const TravelPlanDetails: React.FC<IProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { travelPlan, loadingPlan, deletingTravelPlan } = useSelector(
    (state: RootState) => state.detailReducer
  );
  const { user } = useAppSelector((state: RootState) => state.authReducer);

  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const travelPlanId = match.params.id;

  useEffect(() => {
    dispatch(loadTravelPlan(travelPlanId)).then(() => {
      setLoading(false);
      setIsHost(travelPlan?.createdById === user!.userId);
    });

    return () => {
      setLoading(true);
    };
  }, [dispatch, travelPlan?.createdById, travelPlanId, user]);

  function handleAdd() {
    dispatch(openModal(null));
  }

  if (loadingPlan || loading) {
    return <LoadingComponent content="Loading Travel Plan" />;
  } else if (deletingTravelPlan) {
    return <LoadingComponent content="Deleting Travel Plan" />;
  } else {
    return (
      <Grid>
        <ActivityModal travelPlanId={travelPlan?.id!} />
        <InviteModal travelPlanId={travelPlan?.id!} />
        <Grid.Row>
          <Grid.Column width={10}>
            <TravelPlanDetailHeader isHost={isHost} travelPlan={travelPlan!} />
            <TravelPlanDetailInfo travelPlan={travelPlan!} />
          </Grid.Column>
          <Grid.Column width={6}>
            <TravelPlanDetailSidebar
              isHost={isHost}
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
            {isHost && (
              <Button
                floated="right"
                positive
                style={{ display: "inline" }}
                icon="plus"
                onClick={handleAdd}
              />
            )}

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
            <TravelPlanActivities isHost={isHost} travelPlanId={travelPlan?.id!} />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
};
