import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
import { loadInvitationsAsync } from "./InvitationSlice";

export const TravelPlanInvitations = () => {
  const dispatch = useAppDispatch();
  const { invitations } = useAppSelector((state) => state.invitationReducer);

  useEffect(() => {
    //get travel plan invitations for user
    dispatch(loadInvitationsAsync());
  }, [dispatch]);

  return (
    <Fragment>
      {invitations.map((inv) => (
        <h1>{inv.travelPlanName}</h1>
      ))}
    </Fragment>
  );
};
