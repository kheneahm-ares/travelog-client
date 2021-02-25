import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, RouteProps } from "react-router";
import { Grid } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { loadTravelPlan } from "./detailSlice";
import { TravelPlanActivities } from "./TravelPlanActivities";

interface IProps extends RouteComponentProps<{ id: string }> {}

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
      <Grid.Column width={4}>
        <div>{travelPlan?.name}!</div>
        <div>{travelPlan?.id}!</div>
        
      </Grid.Column>
      <Grid.Column width={12}>
        <TravelPlanActivities travelPlanId={travelPlan!.id} />
      </Grid.Column>
    </Grid>
  );
};
