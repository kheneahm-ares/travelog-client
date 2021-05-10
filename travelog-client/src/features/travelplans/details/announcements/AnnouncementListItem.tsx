import moment from "moment";
import React, { Fragment, useState } from "react";
import { Button, Grid, Header, Item, Label, Segment } from "semantic-ui-react";
import { ITPAnnouncement } from "../../../../app/common/interfaces/ITPAnnouncement";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import { RootState } from "../../../../app/store";
import { AnnouncementForm } from "./AnnouncementForm";
import {
  deleteAnnouncement,
  loadAnnouncements,
  manageFormShow,
} from "./announcementSlice";

export const AnnouncementListItem: React.FC<{
  announcement: ITPAnnouncement;
}> = ({ announcement }) => {
  const dispatch = useAppDispatch();
  const [manageAnnouncement, setManageAnnouncement] = useState<{
    showForm: boolean;
    announcementTargetID: string | null;
  }>({ showForm: false, announcementTargetID: announcement.id });
  function openEdit() {
    setManageAnnouncement({
      showForm: true,
      announcementTargetID: announcement.id,
    });
  }

  async function handleDelete() {
    const actionResult: any = await dispatch(
      deleteAnnouncement({ announcementID: announcement.id })
    );

    if (!actionResult.error) {
      dispatch(loadAnnouncements({ travelPlanID: announcement.travelPlanId }));
    }
  }
  return manageAnnouncement.showForm ? (
    <AnnouncementForm
      initialAnnouncement={announcement}
      travelPlanID={announcement.travelPlanId}
      setManageAnnouncement={setManageAnnouncement}
    />
  ) : (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>
              <Header style={{ display: "inline" }} size="medium">
                {announcement.title}
              </Header>
            </Item.Header>
            <Item.Description>{announcement.description}</Item.Description>

            <Item.Extra>
              <span style={{ display: "inline" }}>
                {moment(announcement.createdDate).format("HH:mm A")}
              </span>
              <Label
                as="a"
                basic
                color="red"
                style={{ display: "inline", float: "right" }}
                onClick={handleDelete}
              >
                Delete
              </Label>
              <Label
                as="a"
                basic
                style={{ display: "inline", float: "right" }}
                onClick={openEdit}
              >
                Edit
              </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};
