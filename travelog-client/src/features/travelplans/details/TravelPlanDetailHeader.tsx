import moment from "moment";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Confirm,
  Dropdown,
  DropdownItem,
  Header,
  Item,
  Menu,
  Segment,
} from "semantic-ui-react";
import { history } from "../../..";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { IUser } from "../../../app/common/interfaces/IUser";
import { useAppDispatch } from "../../../app/customHooks";
import { deleteTravelPlan } from "./detailSlice";

interface IProps {
  travelPlan: ITravelPlan;
  isHost: boolean;
}

export const TravelPlanDetailHeader: React.FC<IProps> = ({
  travelPlan,
  isHost,
}) => {
  const dispatch = useAppDispatch();
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    confirmed: false,
  });

  function handleDelete() {
    dispatch(deleteTravelPlan(travelPlan.id)).then(() => {
      //go back to dashboard
      history.push("/travelplans");
    });
  }

  function handleCancel() {
    setConfirmDelete({ open: false, confirmed: false });
  }

  function openConfirmDelete() {
    setConfirmDelete({ open: true, confirmed: false });
  }

  return (
    <Fragment>
      <Confirm
        content="Are you sure you want to delete Travel Plan?"
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        confirmButton="Delete Travel Plan"
      />
      <Segment textAlign="left" color="teal">
        <Header
          style={{ display: "inline" }}
          size="huge"
          content={travelPlan.name}
        />
        {isHost && (
          <Dropdown
            icon="bars"
            style={{
              display: "inline-block",
              verticalAlign: "center",
              position: "relative",
              float: "right",
              top: "10px",
            }}
            // options={dropdownOptions}
          >
            <Dropdown.Menu>
              <DropdownItem
                icon="edit"
                as={Link}
                text="Edit"
                to={`/travelplans/edit/${travelPlan.id}`}
              />
              <DropdownItem
                icon="trash"
                text="Delete"
                onClick={openConfirmDelete}
              />
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Segment>
    </Fragment>
  );
};
