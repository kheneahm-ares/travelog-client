import React, { Fragment, useState } from "react";
import {
  Item,
  Label,
  Popup,
  Button,
  Image,
  Confirm,
  ConfirmProps,
} from "semantic-ui-react";
import { ITravelPlanTraveler } from "../../../../app/common/interfaces/ITravelPlanTraveler";
import { useAppDispatch } from "../../../../app/customHooks";
import { removeTraveler } from "./sidebarSlice";
import { history } from "../../../..";

interface IProps {
  traveler: ITravelPlanTraveler;
  isHost: boolean;
  loggedInUserId: string;
  creatorId: string;
  travelPlanId: string;
  removeUser: (username: string) => void;
}
export const SidebarTraveler: React.FC<IProps> = ({
  traveler,
  isHost,
  creatorId,
  loggedInUserId,
  travelPlanId,
  removeUser,
}) => {
  const isTraveler = traveler.id === loggedInUserId;
  const isTravelHost = traveler.id === creatorId;
  const isNotHostButIsTraveler = !isHost && isTraveler;
  const dispatch = useAppDispatch();

  //traveler is removable if logged in user isHost AND sidebar traveler is not said host
  //OR if NOT the host BUT sidebar traveler == loggedinuser
  const isTravelerRemovable =
    (isHost && traveler.id !== creatorId) || isNotHostButIsTraveler;

  const [confirmOpen, setConfirmOpen] = useState<boolean>();

  function handleCancel() {
    setConfirmOpen(false);
  }

  function handleOpenConfirm() {
    setConfirmOpen(true);
  }

  function handleRemoveUser(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: ConfirmProps
  ) {
    const username = data.name;

    dispatch(removeTraveler({ username: username, travelPlanId: travelPlanId }))
      .then(() => {
        if (!isHost) {
          history.push("/travelplans");
        } else {
          removeUser(username);
        }
      })
      .catch(() => {
        setConfirmOpen(false);
        console.log("exception");
      });
  }

  return (
    <Fragment>
      <Item key={traveler.userName} style={{ position: "relative" }}>
        {(isTravelHost || isNotHostButIsTraveler) && (
          <Fragment>
            <Label
              style={{ position: "absolute" }}
              color={isTravelHost ? "orange" : "green"}
              ribbon="right"
            >
              {isTravelHost ? (isTraveler ? "Host/You" : "Host") : "You"}
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
                  onClick={handleOpenConfirm}
                />
              }
              size="tiny"
            />
          )}
          <Popup
            content={traveler.userName}
            trigger={
              <Label size="mini" style={{ display: "block", width: "50%" }}>
                {traveler.userName.length < 10
                  ? traveler.userName
                  : traveler.userName.substring(0, 9) + "..."}
              </Label>
            }
          />
        </Item.Content>
      </Item>
      <Confirm
        name={traveler.userName}
        content={`Do you want to remove ${
          isHost ? traveler.userName : "yourself"
        }?`}
        open={confirmOpen}
        onCancel={handleCancel}
        onConfirm={handleRemoveUser}
        confirmButton="Remove"
      />
    </Fragment>
  );
};
