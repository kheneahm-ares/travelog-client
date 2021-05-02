import React, { Fragment, useEffect } from "react";
import {
  Dimmer,
  Divider,
  Header,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { InvitationDetails } from "./InvitationDetails";
import { loadInvitationsAsync } from "./InvitationSlice";

export const TravelPlanInvitations = () => {
  const dispatch = useAppDispatch();
  const { invitations, loading } = useAppSelector(
    (state) => state.invitationReducer
  );

  useEffect(() => {
    //get travel plan invitations for user
    dispatch(loadInvitationsAsync());
  }, [dispatch]);

  return (
    <Fragment>
      <Header as="h1" textAlign="center">
        Travel Plan Invitations
      </Header>
      <Divider />
      {loading && !invitations ? (
        <Dimmer.Dimmable as={Segment}>
          <LoadingComponent content="Loading Invitations" />
        </Dimmer.Dimmable>
      ) : invitations!.length === 0 ? (
        <p>No Invitations</p>
      ) : (
        <List>
          {invitations!.map((inv) => (
            <InvitationDetails key={inv.id} invitation={inv!} />
          ))}
        </List>
      )}
    </Fragment>
  );
};
