import React, { Fragment, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { useSelector } from "react-redux";
import {
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment,
  Tab,
  Table,
} from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { ActivityCard } from "./ActivityCard";
import { getActivitiesByGroup, loadTravelPlanActivities } from "./detailSlice";

interface IProps {
  travelPlanId: string;
}

export const TravelPlanActivities: React.FC<IProps> = ({ travelPlanId }) => {
  const dispatch = useAppDispatch();
  const groupedActivities = useSelector(getActivitiesByGroup(""));
  const {isLoadingActivities} = useSelector((state: RootState) => state.detailReducer);

  useEffect(() => {
    dispatch(loadTravelPlanActivities(travelPlanId));
  }, [dispatch, travelPlanId]);


  return (
    <Fragment>
      {Array.from(groupedActivities).map?.(([key, activities]) => (
        <Container
          key={key}
          style={{
            display: "inline-block",
            verticalAlign: "top",
            width: "auto",
            padding: "5px"
          }}
        >
          <Segment>
            <Header content={key}/>
          </Segment>
          <Divider/>
          {activities.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </Container>
      ))}
    </Fragment>
  );
};
