import React from "react";
import { Button } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import { RootState } from "../../../../app/store";
import { AnnouncementCreate } from "./AnnouncementCreate";
import { AnnouncementForm } from "./AnnouncementForm";
import { AnnouncementList } from "./AnnouncementList";
import { manageFormShow } from "./announcementSlice";

interface IProps {
  isHost: boolean;
  travelPlanID: string;
}

export const TravelPlanAnnouncements: React.FC<IProps> = ({
  isHost,
  travelPlanID,
}) => {

  return (
    <div>
      <AnnouncementCreate travelPlanID={travelPlanID} isHost={isHost} />
      <AnnouncementList travelPlanID={travelPlanID} />
    </div>
  );
};
