import React, { Fragment } from "react";
import { Button } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import { RootState } from "../../../../app/store";
import { AnnouncementForm } from "./AnnouncementForm";
import { manageFormShow } from "./announcementSlice";

interface IProps {
  isHost: boolean;
  travelPlanID: string;
}

export const AnnouncementCreate: React.FC<IProps> = ({
  isHost,
  travelPlanID,
}) => {
  const showForm = useAppSelector(
    (state: RootState) => state.announcementReducer.showForm
  );
  const announcementTargateID = useAppSelector(
    (state: RootState) => state.announcementReducer.announcementTargetID
  );
  const dispatch = useAppDispatch();

  function handleCreateClick() {
    dispatch(
      manageFormShow({
        showForm: true,
        announcementTargetID: null,
      })
    );
  }
  return (
    <Fragment>
      {isHost && (!showForm || announcementTargateID !== null) && (
        <Button floated="right" color="orange" onClick={handleCreateClick}>
          Create Announcement
        </Button>
      )}
      {showForm && announcementTargateID === null && (
        <AnnouncementForm
          travelPlanID={travelPlanID}
          initialAnnouncement={null}
        />
      )}
    </Fragment>
  );
};
