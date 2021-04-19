import React from "react";
import { Button, Grid, Label, List, Segment } from "semantic-ui-react";
import { IInvitation } from "../../../app/common/interfaces/IInvitation";

export const InvitationDetails: React.FC<{ invitations: IInvitation[] }> = ({
  invitations,
}) => {
  return (
    <List>
      {invitations.map((inv) => (
        <Segment key={inv.id}>
          <Grid>
            <Grid.Column width={6}>
              <h2>{inv.travelPlanName}</h2>
              <span>From: <Label>{inv.inviterUsername}</Label></span>
            </Grid.Column>
            <Grid.Column width={6}>
              <h3>{inv.travelPlanName}</h3>
              <h3>{inv.travelPlanName}</h3>

            </Grid.Column>
            <Grid.Column width={4}>
              <Button.Group floated="right">
                <Button negative> Decline</Button>
                <Button.Or/>
                <Button positive>Accept </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Segment>
      ))}
    </List>
  );
};
