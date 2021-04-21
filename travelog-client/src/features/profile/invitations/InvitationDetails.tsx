import React from "react";
import { Button, Grid, Label, List, Segment } from "semantic-ui-react";
import { IInvitation } from "../../../app/common/interfaces/IInvitation";
import { useAppDispatch } from "../../../app/customHooks";
import { loadInvitationsAsync, manageInvite } from "./InvitationSlice";
import { ManageInviteEnum } from "../../../app/common/enums/ManageInvEnum";
import { history } from "../../..";

export const InvitationDetails: React.FC<{ invitation: IInvitation }> = ({
  invitation,
}) => {
  const dispatch = useAppDispatch();

  function handleDeclineInvite(e: any) {
    dispatch(
      manageInvite({
        inviteId: parseInt(invitation.id),
        type: ManageInviteEnum.Decline,
      })
    ).then(() => {
      dispatch(loadInvitationsAsync());
    });
  }
  function handleAcceptInvite() {
    dispatch(
      manageInvite({
        inviteId: parseInt(invitation.id),
        type: ManageInviteEnum.Accept,
      })
    ).then(() => {
      //after accepting, bring them to the activity
      history.push(`/travelplans/${invitation.travelPlanId}`)
    });
  }
  return (
    <Segment>
      <Grid>
        <Grid.Column width={6}>
          <h2>{invitation.travelPlanName}</h2>
          <span>
            From: <Label>{invitation.inviterUsername}</Label>
          </span>
        </Grid.Column>
        <Grid.Column width={6}>
          <h3>{invitation.travelPlanName}</h3>
          <h3>{invitation.travelPlanName}</h3>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button.Group floated="right">
            <Button negative onClick={handleDeclineInvite}>
              Decline
            </Button>
            <Button.Or />
            <Button positive onClick={handleAcceptInvite}>Accept </Button>
          </Button.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
