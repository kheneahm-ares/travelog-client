import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Divider, Header, Segment } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { ActivityCard } from "./ActivityCard";
import { getActivitiesByDate, loadTravelPlanActivities } from "./detailSlice";

interface IProps {
  travelPlanId: string;
}

export const TravelPlanActivities: React.FC<IProps> = ({ travelPlanId }) => {
  const dispatch = useAppDispatch();
  const groupedActivities = useSelector(getActivitiesByDate());
  const { isLoadingActivities } = useSelector(
    (state: RootState) => state.detailReducer
  );

  useEffect(() => {
    dispatch(loadTravelPlanActivities(travelPlanId));
  }, [dispatch, travelPlanId]);

  return (
    <Fragment>
      {isLoadingActivities ? (
        <LoadingComponent content="Loading Activities" />
      ) : (
        <Fragment>
          {Array.from(groupedActivities).map?.(([key, activities]) => (
            <Container
              key={key}
              style={{
                display: "inline-block",
                verticalAlign: "top",
                width: "auto",
                padding: "5px",
              }}
            >
              <Segment>
                <Header content={key} />
              </Segment>
              <Divider />
              {activities.map((a) => (
                <ActivityCard
                  key={a.id}
                  activity={a}
                  travelPlanId={travelPlanId}
                />
              ))}
            </Container>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};
