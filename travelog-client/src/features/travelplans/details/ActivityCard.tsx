import React, { Fragment } from "react";
import { act } from "react-dom/test-utils";
import { Button, Card, Container, Item, Segment } from "semantic-ui-react";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { useAppDispatch } from "../../../app/customHooks";
import { openModal } from "./detailSlice";

interface IProps {
  activity: ITravelPlanActivity;
}

export const ActivityCard: React.FC<IProps> = ({ activity }) => {
  const formattedStart = `${activity.startTime.split("T")[1].split(".")[0]}`;
  const formattedEnd = `${activity.endTime.split("T")[1].split(".")[0]}`;
  const dispatch = useAppDispatch();

  const timeRange = `${formattedStart} - ${formattedEnd}`;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{activity.name}</Card.Header>
        <Card.Meta>{activity.location}</Card.Meta>
        <Card.Description>{timeRange}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          color="yellow"
          floated="right"
          onClick={() => dispatch(openModal(activity))}
        >
          Quick Edit
        </Button>
      </Card.Content>
    </Card>
  );
};
