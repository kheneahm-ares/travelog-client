import moment from "moment";
import React, { Fragment } from "react";
import { Header, Item, Label, Segment } from "semantic-ui-react";
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
  isHost: boolean;
}> = ({ announcement, isHost }) => {
  const dispatch = useAppDispatch();
  function openEdit() {
    dispatch(
      manageFormShow({
        showForm: true,
        announcementTargetID: announcement.id,
      })
    );
  }

  const showForm = useAppSelector(
    (state: RootState) => state.announcementReducer.showForm
  );
  const announcementTargateID = useAppSelector(
    (state: RootState) => state.announcementReducer.announcementTargetID
  );

  async function handleDelete() {
    const actionResult: any = await dispatch(
      deleteAnnouncement({ announcementID: announcement.id })
    );

    if (!actionResult.error) {
      dispatch(loadAnnouncements({ travelPlanID: announcement.travelPlanId }));
    }
  }
  return showForm && announcementTargateID === announcement.id ? (
    <AnnouncementForm
      initialAnnouncement={announcement}
      travelPlanID={announcement.travelPlanId}
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
              {isHost && (
                <Fragment>
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
                </Fragment>
              )}
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};
