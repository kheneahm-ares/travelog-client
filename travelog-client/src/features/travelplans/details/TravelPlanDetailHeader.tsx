import moment from "moment";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Confirm,
  Dropdown,
  DropdownItem,
  Header,
  Item,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import { history } from "../../..";
import { TravelPlanStatusEnum } from "../../../app/common/enums/TravelPlanStatusEnum";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { IUser } from "../../../app/common/interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
import { deleteTravelPlan, setTravelPlanStatus } from "./detailSlice";

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

  async function handleDelete() {
    try {
      const actionResult: any = await dispatch(deleteTravelPlan(travelPlan.id));

      if (actionResult.error) {
        toast.error(actionResult.error.message);
      } else {
        history.push("/travelplans");
      }
    } catch (err) {}
  }

  function handleCancel() {
    setConfirmDelete({ open: false, confirmed: false });
  }

  function openConfirmDelete() {
    setConfirmDelete({ open: true, confirmed: false });
  }

  async function handleChangeStatus(uniqStatus: number) {
    const actionResult: any = await dispatch(
      setTravelPlanStatus({
        travelPlanId: travelPlan.id,
        uniqStatus: uniqStatus,
      })
    );
    console.log(actionResult);

    if (actionResult.error) {
      toast.error(actionResult.error.message);
    } else {
      switch (uniqStatus) {
        case TravelPlanStatusEnum.Archived:
          toast.success(`Successfully Archived Travel Plan Status`);
          break;
        case TravelPlanStatusEnum.Completed:
          toast.success(`Successfully Completed Travel Plan Status. Congrats!!!`);
          break;
        case TravelPlanStatusEnum.OnGoing:
          toast.success(`Successfully Started Travel Plan Status`);
          break;
        default:
          break;
      }
    }
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
          >
            <Dropdown.Menu>
              {travelPlan.travelPlanStatus.uniqStatus ===
                TravelPlanStatusEnum.Created && (
                <Fragment>
                  <DropdownItem
                    text="Start"
                    icon="play"
                    onClick={() =>
                      handleChangeStatus(TravelPlanStatusEnum.OnGoing)
                    }
                  />
                  <DropdownItem
                    text="Archive"
                    icon="save"
                    onClick={() =>
                      handleChangeStatus(TravelPlanStatusEnum.Archived)
                    }
                  />
                </Fragment>
              )}
              {travelPlan.travelPlanStatus.uniqStatus ===
                TravelPlanStatusEnum.OnGoing && (
                <Fragment>
                  <DropdownItem
                    text="Archive"
                    icon="save"
                    onClick={() =>
                      handleChangeStatus(TravelPlanStatusEnum.Archived)
                    }
                  />
                  <DropdownItem
                    text="Complete"
                    icon="clipboard check"
                    onClick={() =>
                      handleChangeStatus(TravelPlanStatusEnum.Completed)
                    }
                  />
                </Fragment>
              )}
              {(travelPlan.travelPlanStatus.uniqStatus ===
                TravelPlanStatusEnum.Archived ||
                travelPlan.travelPlanStatus.uniqStatus ===
                  TravelPlanStatusEnum.Completed) && (
                <Fragment>
                  <DropdownItem
                    text="Start"
                    icon="play"
                    onClick={() =>
                      handleChangeStatus(TravelPlanStatusEnum.OnGoing)
                    }
                  />
                </Fragment>
              )}

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
