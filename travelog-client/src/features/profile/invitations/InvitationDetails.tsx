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

  async function manageInvitation(manageType: ManageInviteEnum) {
    const actionResult: any = await dispatch(
      manageInvite({
        inviteId: parseInt(invitation.id),
        type: manageType,
      })
    );
    if (manageType === ManageInviteEnum.Accept && !actionResult.error) {
      //after accepting, bring them to the activity
      history.push(`/travelplans/${invitation.travelPlanId}`);
    }
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
            <Button negative onClick={() => manageInvitation(ManageInviteEnum.Decline)}>
              Decline
            </Button>
            <Button.Or />
            <Button positive onClick={() => manageInvitation(ManageInviteEnum.Accept)}>
              Accept{" "}
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
