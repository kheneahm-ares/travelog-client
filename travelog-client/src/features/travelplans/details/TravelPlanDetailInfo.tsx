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
            <p>{travelPlan.description.length < 100 ? travelPlan.description : travelPlan.description.substring(0, 99) + "..."}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="calendar" />
          </Grid.Column>
          <Grid.Column width={15}>
            <Grid columns={2} divided>
              <Grid.Column>
                <p>
                  {moment(travelPlan.startDate).format("MMM Do YYYY")}-
                  {moment(travelPlan.endDate).format("MMM Do YYYY")}
                </p>
              </Grid.Column>
              <Grid.Column >
                <Icon size='large' color='teal' name='heartbeat'/>
                <span>
                  {travelPlan.travelPlanStatus.description}
                </span>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
