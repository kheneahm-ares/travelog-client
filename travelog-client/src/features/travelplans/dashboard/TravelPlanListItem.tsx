import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

interface IProps {
  travelPlan: ITravelPlan;
}
export const TravelPlanListItem: React.FC<IProps> = ({ travelPlan }) => {
  const currDate = new Date();
  const difference = moment(travelPlan.startDate).diff(
    moment(currDate),
    "days"
  );

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image src="" />
            <Item.Content>
              <Item.Header>{travelPlan.name}</Item.Header>
              <Item.Meta>
                {moment(travelPlan.startDate).format("MMM Do YYYY")} -
                {moment(travelPlan.endDate).format("MMM Do YYYY")}
              </Item.Meta>
              <Item.Description>{travelPlan.description}</Item.Description>
              {difference < 20 && (
                <Item.Description style={{color: "red"}}>
                  Coming up soon in {difference} days!
                </Item.Description>
              )}
              <Item.Extra>{travelPlan.travelPlanStatus.description}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/travelplans/${travelPlan.id}`}
          floated="right"
          content="Details"
          color="purple"
        />
      </Segment>
    </Segment.Group>
  );
};
