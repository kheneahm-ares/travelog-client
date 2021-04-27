import moment from "moment";
import React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
interface IProps {
  travelPlan: ITravelPlan;
}
export const TravelPlanDetailInfo: React.FC<IProps> = ({ travelPlan }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{travelPlan.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="calendar" />
          </Grid.Column>
          <Grid.Column width={15}>
            <Grid>
              <Grid.Column width={8}>
                <p>
                  Start Date:{" "}
                  {moment(travelPlan.startDate).format("MMM Do YYYY")}
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <p>
                  End Date:{" "}
                  {moment(travelPlan.endDate).format("MMM Do YYYY")}
                </p>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
