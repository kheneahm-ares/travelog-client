import React from "react";
import { Button } from "semantic-ui-react";
import { AnnouncementList } from "./AnnouncementList";

interface IProps {
  isHost: boolean;
  travelPlanID: string;
}

export const TravelPlanAnnouncements: React.FC<IProps> = ({ isHost, travelPlanID}) => {
  return (
    <div>
      {isHost && <Button floated="right" color="orange">Create Announcement</Button>}
      <AnnouncementList travelPlanID={travelPlanID}/>
    </div>
  );
};
