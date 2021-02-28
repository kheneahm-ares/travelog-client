import React, { Fragment, SyntheticEvent, useState } from "react";
import { act } from "react-dom/test-utils";
import { Button, Card, Container, Item, Segment } from "semantic-ui-react";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
import { deleteActivity, loadTravelPlanActivities, openModal } from "./detailSlice";
import moment from "moment";
import { RootState } from "../../../app/store";

interface IProps {
  activity: ITravelPlanActivity;
  travelPlanId: string;
}

export const ActivityCard: React.FC<IProps> = ({ activity, travelPlanId}) => {
  const { deletingActivity, activityTarget} = useAppSelector(
    (state: RootState) => state.detailReducer
  );
  const dispatch = useAppDispatch();

  const mStart = moment(new Date(activity.startTime));
  const mEnd = moment(new Date(activity.endTime));
  const formattedStart = `${mStart.format("hh:mm a")}`;
  const formattedEnd = `${mEnd.format("hh:mm a")}`;

  const timeRange = `${formattedStart} - ${formattedEnd}`;

  function handleDelete(id: string) {
    dispatch(deleteActivity(id)).then(() => {
      //reload
      dispatch(loadTravelPlanActivities(travelPlanId));
    })
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>{activity.name}</Card.Header>
        <Card.Meta>{activity.location}</Card.Meta>
        <Card.Description>{timeRange}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <Button.Group widths="8">
          <Button
            basic
            negative
            onClick={() => handleDelete(activity.id)}
            loading={deletingActivity && activityTarget === activity.id}
            name={activity.id}
          >
            Delete
          </Button>
          <Button basic positive onClick={() => dispatch(openModal(activity))}>
            View
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
