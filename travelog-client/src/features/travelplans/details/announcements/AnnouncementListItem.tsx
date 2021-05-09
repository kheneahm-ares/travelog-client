import moment from "moment";
import React, { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { ITPAnnouncement } from "../../../../app/common/interfaces/ITPAnnouncement";

export const AnnouncementListItem: React.FC<{
  announcement: ITPAnnouncement;
}> = ({ announcement }) => {
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header><Header size='medium'>{announcement.title}</Header></Item.Header>
            <Item.Description>{announcement.description}{announcement.description}{announcement.description}{announcement.description}{announcement.description}</Item.Description>
            <Item.Extra>{moment(announcement.createdDate).format("HH:mm A")}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};
