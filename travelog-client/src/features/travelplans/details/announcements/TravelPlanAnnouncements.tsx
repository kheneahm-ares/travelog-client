import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useAppSelector } from "../../../../app/customHooks";
import { RootState } from "../../../../app/store";
import { AnnouncementForm } from "./AnnouncementForm";
import { AnnouncementList } from "./AnnouncementList";

interface IProps {
  isHost: boolean;
  travelPlanID: string;
}

export const TravelPlanAnnouncements: React.FC<IProps> = ({
  isHost,
  travelPlanID,
}) => {
  const [manageAnnouncement, setManageAnnouncement] = useState<{
    showForm: boolean;
    announcementTargetID: string | null;
  }>({ showForm: false, announcementTargetID: null });
  return (
    <div>
      {isHost && !manageAnnouncement.showForm && (
        <Button
          floated="right"
          color="orange"
          onClick={() =>
            setManageAnnouncement({
              showForm: true,
              announcementTargetID: null,
            })
          }
        >
          Create Announcement
        </Button>
      )}
      {manageAnnouncement.showForm && (
        <AnnouncementForm
          travelPlanID={travelPlanID}
          initialAnnouncement={null}
          setManageAnnouncement={setManageAnnouncement}
        />
      )}
      <AnnouncementList travelPlanID={travelPlanID} />
    </div>
  );
};
