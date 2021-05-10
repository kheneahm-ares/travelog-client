import React from "react";
import { Container } from "semantic-ui-react";
import { AnnouncementCreate } from "./AnnouncementCreate";
import { AnnouncementList } from "./AnnouncementList";

interface IProps {
  isHost: boolean;
  travelPlanID: string;
}

export const TravelPlanAnnouncements: React.FC<IProps> = ({
  isHost,
  travelPlanID,
}) => {

  return (
    <Container >
      <AnnouncementCreate travelPlanID={travelPlanID} isHost={isHost} />
      <AnnouncementList travelPlanID={travelPlanID} isHost={isHost} />
    </Container>
  );
};
