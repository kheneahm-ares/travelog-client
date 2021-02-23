import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Item, Label } from "semantic-ui-react";
import { RootState } from "../../../app/store";

export const TravelPlanList = () => {
  const { travelPlans } = useSelector(
    (state: RootState) => state.dashboardReducer
  );
  return (
    <Item.Group>
      {travelPlans.map((tp) => (
        <Item key={tp.id}>
          <Item.Image src="" />
          <Item.Content>
            <Item.Header >{tp.name}</Item.Header>
            <Item.Meta>
              {tp.startDate}, {tp.endDate}
            </Item.Meta>
            <Item.Description>{tp.description}</Item.Description>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};
