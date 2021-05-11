import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Dimmer,
  Header,
  Label,
  Pagination,
  Segment,
} from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootState } from "../../../../app/store";
import { AnnouncementListItem } from "./AnnouncementListItem";
import { AnnouncementListPag } from "./AnnouncementListPag";
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
  const { loading, announcementCount } = useAppSelector(
    (state: RootState) => state.announcementReducer
  );

  const LIMIT: number = 5;

  const offset = useAppSelector(
    (state: RootState) => state.announcementReducer.offset
  );

  useEffect(() => {
    dispatch(
      loadAnnouncements({
        travelPlanID: travelPlanID,
        limit: LIMIT,
        offset: offset,
      })
    );
  }, [dispatch, travelPlanID, offset]);

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
          <Fragment>
            {Array.from(announcementMap).map(([key, announcements]) => {
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
            })}
          </Fragment>
        )}
      </Fragment>
    );
  }
};
