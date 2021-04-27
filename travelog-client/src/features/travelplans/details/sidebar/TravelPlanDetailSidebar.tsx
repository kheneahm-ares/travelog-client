import React, { Fragment, useState } from "react";
import {
  Segment,
  List,
  Button,
} from "semantic-ui-react";
import { ITravelPlanTraveler } from "../../../../app/common/interfaces/ITravelPlanTraveler";
import { useAppDispatch } from "../../../../app/customHooks";
import { openModal } from "../detailSlice";
import { SidebarTraveler } from "./SidebarTraveler";

interface IProps {
  travelers: ITravelPlanTraveler[];
  creatorId: string;
  travelPlanId: string;
  loggedInUserId: string;
  isHost: boolean;
}
export const TravelPlanDetailSidebar: React.FC<IProps> = ({
  travelers,
  creatorId,
  isHost,
  travelPlanId,
  loggedInUserId,
}) => {
  const dispatch = useAppDispatch();
  const [currTravelers, setCurrTravelers] = useState<ITravelPlanTraveler[]>(
    travelers
  );

  function filterOutTraveler(username: string) {
    setCurrTravelers(currTravelers.filter((t) => t.userName !== username));
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
            <SidebarTraveler
              key={traveler.id}
              traveler={traveler}
              loggedInUserId={loggedInUserId}
              isHost={isHost}
              creatorId={creatorId}
              travelPlanId={travelPlanId}
              filterOutTraveler={filterOutTraveler}
            />
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};
