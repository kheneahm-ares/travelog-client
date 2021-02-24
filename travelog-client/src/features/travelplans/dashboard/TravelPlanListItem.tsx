import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

interface IProps {
  travelPlan: ITravelPlan;
}
export const TravelPlanListItem: React.FC<IProps> = ({ travelPlan }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image src="" />
            <Item.Content>
              <Item.Header>{travelPlan.name}</Item.Header>
              <Item.Meta>
                {travelPlan.startDate}, {travelPlan.endDate}
              </Item.Meta>
              <Item.Description>{travelPlan.description}</Item.Description>
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
          color='purple'
        />
      </Segment>
    </Segment.Group>
  );
};
