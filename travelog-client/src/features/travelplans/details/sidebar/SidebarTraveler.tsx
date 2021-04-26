import React, { Fragment } from "react";
import { Item, Label, Popup, Button, Image } from "semantic-ui-react";
import { ITravelPlanTraveler } from "../../../../app/common/interfaces/ITravelPlanTraveler";
import { useAppDispatch } from "../../../../app/customHooks";

interface IProps {
  traveler: ITravelPlanTraveler;
  isHost: boolean;
  loggedInUserId: string;
  creatorId: string;
  travelPlanId: string;
  handleRemoveUser: (event: any) => void;
}
export const SidebarTraveler: React.FC<IProps> = ({
  traveler,
  isHost,
  creatorId,
  loggedInUserId,
  travelPlanId,
  handleRemoveUser,
}) => {
  const isNotHostButIsTraveler = !isHost && traveler.id === loggedInUserId;
  const isTravelHost = traveler.id === creatorId;

  //traveler is removable if logged in user isHost AND sidebar traveler is not said host
  //OR if NOT the host BUT sidebar traveler == loggedinuser
  const isTravelerRemovable =
    (isHost && traveler.id !== creatorId) || isNotHostButIsTraveler;

  return (
    <Item key={traveler.userName} style={{ position: "relative" }}>
      {(isTravelHost || isNotHostButIsTraveler) && (
        <Fragment>
          <Label
            style={{ position: "absolute" }}
            color={isTravelHost ? "orange" : "green"}
            ribbon="right"
          >
            {isTravelHost ? "Host/You" : "You"}
          </Label>
        </Fragment>
      )}
      <Image size="tiny" src={"/Assets/Images/user.png"} />
      <Item.Content verticalAlign="middle">
        <Item.Header style={{ display: "inline" }} as="h2">
          {traveler.displayName}
        </Item.Header>
        {isTravelerRemovable && (
          <Popup
            style={{ display: "inline" }}
            content="Remove"
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
        <Popup
          content={traveler.userName}
          trigger={
            <Label size="mini" style={{ display: "block", width: "50%" }}>
              {traveler.userName.length < 10 ? traveler.userName : traveler.userName.substring(0, 9) + "..."}
            </Label>
          }
        />
      </Item.Content>
    </Item>
  );
};
