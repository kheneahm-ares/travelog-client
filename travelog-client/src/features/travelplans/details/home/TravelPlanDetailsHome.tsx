import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Container, Dimmer, Grid, Segment } from "semantic-ui-react";
import { AuthService } from "../../../../app/auth/AuthServices";
import { useAppDispatch } from "../../../../app/customHooks";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootState } from "../../../../app/store";
import { TravelPlanActivities } from "../activities/TravelPlanActivities";
import { loadTravelPlan } from "../detailSlice";
import { openModal } from "../activities/activitySlice";
import { TravelPlanDetailSidebar } from "../sidebar/TravelPlanDetailSidebar";
import { TravelPlanDetailHeader } from "../TravelPlanDetailHeader";
import { TravelPlanDetailInfo } from "../TravelPlanDetailInfo";
import { ActivityModal } from "../activities/ActivityModal";
import { InviteModal } from "../invite/InviteModal";

interface IProps {
  travelPlanId: string;
}

export const TravelPlanDetailsHome: React.FC<IProps> = ({ travelPlanId }) => {
  const dispatch = useAppDispatch();
  const { travelPlan, loadingPlan, deletingTravelPlan } = useSelector(
    (state: RootState) => state.detailReducer
  );
  const userId = AuthService.getAppUser()?.userId;

  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadTravelPlan(travelPlanId)).then((actionResult: any) => {
      setLoading(false);
      setIsHost(travelPlan?.createdById === userId);
    });

    return () => {
      setLoading(true);
    };
  }, [dispatch, travelPlan?.createdById, travelPlanId, userId]);

  function handleAdd() {
    dispatch(openModal(null));
  }
  if (loadingPlan || loading) {
    return (
      <Dimmer.Dimmable as={Segment}>
        <LoadingComponent content="Loading Invitations" />
      </Dimmer.Dimmable>
    );
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
              travelPlanId={travelPlan?.id!}
              loggedInUserId={userId!}
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
            <TravelPlanActivities
              isHost={isHost}
              travelPlanId={travelPlan?.id!}
            />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
};
