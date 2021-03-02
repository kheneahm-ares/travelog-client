import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dropdown,
  Header,
  Item,
  Menu,
  Segment,
} from "semantic-ui-react";
import { history } from "../../..";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

interface IProps {
  travelPlan: ITravelPlan;
}


export const TravelPlanDetailHeader: React.FC<IProps> = ({ travelPlan }) => {
  const dropdownOptions = [
    {key: 'edit', text: 'Edit', icon: 'edit', as: Link, to: `/travelplans/edit/${travelPlan.id}`},
    {key: 'delete', text: 'Delete', icon: 'trash'}
  ]
  return (
    <Segment textAlign="left" color="teal">
      <Header
        style={{ display: "inline" }}
        size="huge"
        content={travelPlan.name}
      />
      <Dropdown
        icon="bars"
        style={{
          display: "inline-block",
          verticalAlign: "center",
          position: "relative",
          float:'right',
          top:'10px'
        }}
        options={dropdownOptions}
      >
      </Dropdown>
    </Segment>
  );
};
