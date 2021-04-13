import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image, Button } from "semantic-ui-react";
import { ITravelPlanTraveler } from "../../../app/common/interfaces/ITravelPlanTraveler";
import { useAppDispatch } from "../../../app/customHooks";
import { openModal } from "./detailSlice";

interface IProps {
  travelers: ITravelPlanTraveler[];
  creatorId: string;
}
export const TravelPlanDetailSidebar: React.FC<IProps> = ({
  travelers,
  creatorId,
}) => {
  const dispatch = useAppDispatch();
  function handleInviteUser() {
    dispatch(openModal());
  }
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        <span>
          {travelers.length} {travelers.length === 1 ? "Person" : "People"}{" "}
          going
        </span>
        <Button
          floated="right"
          standard = "true"
          icon="plus"
          size="mini"
          onClick={handleInviteUser}
        />
      </Segment>
      <Segment
        attached
        style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }}
      >
        <List relaxed divided>
          {travelers.map((traveler) => (
            <Item key={traveler.userName} style={{ position: "relative" }}>
              {traveler.id === creatorId && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <Image size="tiny" src={"/Assets/Images/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">{traveler.displayName}</Item.Header>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};
