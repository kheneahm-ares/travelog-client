import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { Container, Dimmer, Label } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootState } from "../../../../app/store";
import { AnnouncementListItem } from "./AnnouncementListItem";
import { getAnnouncementsByDate, loadAnnouncements } from "./announcementSlice";

export const AnnouncementList: React.FC<{ travelPlanID: string }> = (
  travelPlanID
) => {
  const dispatch = useAppDispatch();
  const announcementMap = useAppSelector(getAnnouncementsByDate());
  const { loading } = useAppSelector(
    (state: RootState) => state.announcementReducer
  );

  useEffect(() => {
    dispatch(loadAnnouncements(travelPlanID));
  }, [dispatch, travelPlanID]);

  if (loading) {
    return (
      <Dimmer.Dimmable>
        <LoadingComponent content="Loading Announcements" />
      </Dimmer.Dimmable>
    );
  } else {
    return (
      <Fragment>
        {Array.from(announcementMap).map(([key, announcements]) => {
          return (
            <Container key={key}>
              <Label size="huge">{moment(key).format("MMM Do, ddd")}</Label>
              {announcements.map((a) => (
                <AnnouncementListItem key={a.id} announcement={a} />
              ))}
            </Container>
          );
        })}
      </Fragment>
    );
  }
};
