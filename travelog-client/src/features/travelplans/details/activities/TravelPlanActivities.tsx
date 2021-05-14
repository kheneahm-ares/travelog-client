import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Divider, Header, Segment } from "semantic-ui-react";
import { ActivityHelper } from "../../../../app/common/helpers/ActivityHelper";
import { ITravelPlanActivity } from "../../../../app/common/interfaces/ITravelPlanActivity";
import { useAppDispatch } from "../../../../app/customHooks";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootState } from "../../../../app/store";
import { ActivityCard } from "./ActivityCard";
import { ActivityModal } from "./ActivityModal";
import { getActivitiesByDate, loadTravelPlanActivities } from "./activitySlice";

interface IProps {
  travelPlanId: string;
  isHost: boolean;
}

export const TravelPlanActivities: React.FC<IProps> = ({
  travelPlanId,
  isHost,
}) => {
  const dispatch = useAppDispatch();
  const groupedActivities = useSelector(getActivitiesByDate());
  const { loadingActivities } = useSelector(
    (state: RootState) => state.activityReducer
  );

  useEffect(() => {
    dispatch(loadTravelPlanActivities(travelPlanId));
  }, [dispatch, travelPlanId]);

  function validateActivity(formActivity: ITravelPlanActivity) {
    const groupKey = moment(formActivity.startTime).format("yyyy-MM-DD");
    const activitiesRegistry = groupedActivities.get(groupKey);

    ActivityHelper.validateActivityTimes(formActivity, activitiesRegistry!);
  }

  return (
    <Fragment>
      {loadingActivities ? (
        <LoadingComponent content="Loading Activities" />
      ) : (
        <Fragment>
          <ActivityModal groupedActivities={groupedActivities} travelPlanId={travelPlanId} />

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
                  isHost={isHost}
                />
              ))}
            </Container>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};
