import React, { Fragment } from "react";
import { Container, Pagination } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import { RootState } from "../../../../app/store";
import { managePageChange } from "./announcementSlice";

export const AnnouncementListPag = () => {
  const dispatch = useAppDispatch();
  const announcementCount = useAppSelector(
    (state: RootState) => state.announcementReducer.announcementCount
  );
  const limit = useAppSelector(
    (state: RootState) => state.announcementReducer.limit
  );
  const TOTAL_PAGES = Math.ceil(announcementCount / limit);

  function handlePageChange(e: any, { activePage }: any) {
    dispatch(managePageChange(activePage));
  }
  return (
    <Container>
      <Pagination
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
      />
    </Container>
  );
};
