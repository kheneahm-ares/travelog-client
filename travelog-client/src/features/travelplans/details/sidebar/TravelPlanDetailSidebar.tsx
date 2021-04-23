import { stringify } from "node:querystring";
import React, { Fragment, useEffect, useState } from "react";
import {
  Segment,
  List,
  Item,
  Label,
  Image,
  Button,
  Popup,
} from "semantic-ui-react";
import { ITravelPlanTraveler } from "../../../../app/common/interfaces/ITravelPlanTraveler";
import { useAppDispatch } from "../../../../app/customHooks";
import { openModal } from "../detailSlice";
import { removeTraveler } from "./sidebarSlice";

interface IProps {
  travelers: ITravelPlanTraveler[];
  creatorId: string;
  travelPlanId: string;
  isHost: boolean;
}
export const TravelPlanDetailSidebar: React.FC<IProps> = ({
  travelers,
  creatorId,
  isHost,
  travelPlanId,
}) => {
  const dispatch = useAppDispatch();
  const [currTravelers, setCurrTravelers] = useState<ITravelPlanTraveler[]>(
    travelers
  );

  function handleRemoveUser(event: React.MouseEvent<HTMLButtonElement>) {
    const username = event.currentTarget.name;

    dispatch(
      removeTraveler({ username: username, travelPlanId: travelPlanId })
    ).then(() => {
      setCurrTravelers(currTravelers.filter((t) => t.userName !== username));
    });

  }
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
          {travelers.length} {travelers.length === 1 ? "Traveler" : "Travelers"}
        </span>
        {isHost && (
          <Button
            floated="right"
            standard="true"
            icon="plus"
            size="mini"
            onClick={handleInviteUser}
          />
        )}
      </Segment>
      <Segment
        attached
        style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }}
      >
        <List relaxed divided>
          {currTravelers.map((traveler) => (
            <Item key={traveler.userName} style={{ position: "relative" }}>
              {traveler.id === creatorId && (
                <Fragment>
                  <Label
                    style={{ position: "absolute" }}
                    color="orange"
                    ribbon="right"
                  >
                    Host
                  </Label>
                </Fragment>
              )}
              <Image size="tiny" src={"/Assets/Images/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header style={{ display: "inline" }} as="h2">
                  {traveler.displayName}
                </Item.Header>
                {isHost && traveler.id !== creatorId && (
                  <Popup
                    style={{ display: "inline" }}
                    content="Remove user"
                    trigger={
                      <Button
                        name={traveler.userName}
                        size="mini"
                        circular
                        icon="remove user"
                        floated="right"
                        onClick={handleRemoveUser}
                      />
                    }
                    size="tiny"
                  />
                )}
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};
