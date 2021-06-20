import { Grid, Header } from "semantic-ui-react";
import { TravelPlanBody } from "./TravelPlanBody";
import { TravelPlanCalendar } from "./TravelPlanCalendar";
import { TravelPlanStatusFilter } from "./TravelPlanStatusFilter";

export const TravelPlanDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <Header size="huge" textAlign="center">
          Travel Plans
        </Header>
        <TravelPlanStatusFilter />
      </Grid.Column>
      <Grid.Column width={10}>
        <TravelPlanBody />
      </Grid.Column>
      <Grid.Column width={6}>
        <TravelPlanCalendar />
      </Grid.Column>
    </Grid>
  );
};
