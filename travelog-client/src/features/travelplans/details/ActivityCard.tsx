import React, { Fragment } from "react";
import { act } from "react-dom/test-utils";
import { Card, Item, Segment } from "semantic-ui-react";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";

interface IProps {
  activity: ITravelPlanActivity;
}

export const ActivityCard: React.FC<IProps> = ({ activity }) => {
  const formattedStart = `${activity.startTime.split("T")[1].split(".")[0]}`;
  const formattedEnd = `${activity.endTime.split("T")[1].split(".")[0]}`;

  const timeRange = `${formattedStart} - ${formattedEnd}`;
  return (
    <Card
      header={activity.name}
      meta={activity.location}
      description={timeRange}
    />
  );
};
