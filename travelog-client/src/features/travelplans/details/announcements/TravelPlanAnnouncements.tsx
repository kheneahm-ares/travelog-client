import React from "react";
import { Button } from "semantic-ui-react";

export const TravelPlanAnnouncements: React.FC<{ isHost: boolean }> = ({
  isHost,
}) => {
  return (
    <div>
      {isHost && <Button>Create Announcement</Button>}
      Announcements
    </div>
  );
};
