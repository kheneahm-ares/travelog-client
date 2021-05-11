import React from "react";
import { Container } from "semantic-ui-react";
import { AnnouncementCreate } from "./AnnouncementCreate";
import { AnnouncementList } from "./AnnouncementList";
import { AnnouncementListPag } from "./AnnouncementListPag";

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
      <AnnouncementListPag />
      <AnnouncementList travelPlanID={travelPlanID} isHost={isHost} />
    </Container>
  );
};
