import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { Container, Dimmer, Header, Label, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootState } from "../../../../app/store";
import { AnnouncementListItem } from "./AnnouncementListItem";
import { getAnnouncementsByDate, loadAnnouncements } from "./announcementSlice";

interface IProps {
  isHost: boolean;
  travelPlanID: string;
}

export const AnnouncementList: React.FC<IProps> = ({
  travelPlanID,
  isHost,
}) => {
  const dispatch = useAppDispatch();
  const announcementMap = useAppSelector(getAnnouncementsByDate());
  const { loading } = useAppSelector(
    (state: RootState) => state.announcementReducer
  );

  useEffect(() => {
    dispatch(loadAnnouncements({ travelPlanID }));
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
        {announcementMap.size === 0 ? (
          <Fragment>
            <Header>No Announcements</Header>
          </Fragment>
        ) : (
          Array.from(announcementMap).map(([key, announcements]) => {
            return (
              <Container key={key}>
                <Label size="huge">{moment(key).format("MMM Do, ddd")}</Label>
                {announcements.map((a) => (
                  <AnnouncementListItem
                    key={a.id}
                    announcement={a}
                    isHost={isHost}
                  />
                ))}
              </Container>
            );
          })
        )}
      </Fragment>
    );
  }
};
