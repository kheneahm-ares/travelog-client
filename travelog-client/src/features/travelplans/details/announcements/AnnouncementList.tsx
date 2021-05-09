import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { Container, Label } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import { AnnouncementListItem } from "./AnnouncementListItem";
import { getAnnouncementsByDate, loadAnnouncements } from "./announcementSlice";

export const AnnouncementList: React.FC<{ travelPlanID: string }> = (
  travelPlanID
) => {
  const dispatch = useAppDispatch();
  const announcementMap = useAppSelector(getAnnouncementsByDate());

  useEffect(() => {
    dispatch(loadAnnouncements(travelPlanID));
  }, [dispatch, travelPlanID]);

  return (
    <Fragment>
      {Array.from(announcementMap).map(([key, announcements]) => {
        return (
          <Container>
            <Label size='huge'>{moment(key).format("MMM Do, ddd")}</Label>
            {announcements.map((a) => (
              <AnnouncementListItem key={a.id} announcement={a} />
            ))}
          </Container>
        );
      })}
    </Fragment>
  );
};
