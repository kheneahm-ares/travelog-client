import React, { Fragment, SyntheticEvent, useState } from "react";
import { act } from "react-dom/test-utils";
import {
  Button,
  Card,
  Confirm,
  Container,
  Item,
  Segment,
} from "semantic-ui-react";
import { ITravelPlanActivity } from "../../../../app/common/interfaces/ITravelPlanActivity";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import {
  deleteActivity,
  loadTravelPlanActivities,
  openModal,
} from "./activitySlice";
import moment from "moment";
import { RootState } from "../../../../app/store";

interface IProps {
  activity: ITravelPlanActivity;
  travelPlanId: string;
}

export const ActivityCard: React.FC<IProps> = ({ activity, travelPlanId }) => {
  const { deletingActivity, activityTarget } = useAppSelector(
    (state: RootState) => state.activityReducer
  );
  const { user } = useAppSelector((state: RootState) => state.authReducer);
  const dispatch = useAppDispatch();
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    confirmed: false,
  });

  const mStart = moment(activity.startTime);
  const mEnd = moment(activity.endTime);
  const formattedStart = `${mStart.format("hh:mm a")}`;
  const formattedEnd = `${mEnd.format("hh:mm a")}`;

  const timeRange = `${formattedStart} - ${formattedEnd}`;

  function handleDelete() {
    dispatch(deleteActivity(activity.id)).then(() => {
      //reload
      dispatch(loadTravelPlanActivities(travelPlanId));
    });
  }

  function handleCancel() {
    setConfirmDelete({ open: false, confirmed: false });
  }

  function openConfirmDelete() {
    setConfirmDelete({ open: true, confirmed: false });
  }
  function handleView()
  {
    dispatch(openModal(activity))
  }

  return (
    <Fragment>
      <Card>
        <Card.Content>
          <Card.Header>{activity.name}</Card.Header>
          <Card.Meta>{activity.location.address}</Card.Meta>
          <Card.Description>{timeRange}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Button.Group widths="8">
            <Button
              basic
              negative
              onClick={openConfirmDelete}
              loading={deletingActivity && activityTarget === activity.id}
              name={activity.id}
              disabled = {user?.userId !== activity.hostId}
            >
              Delete
            </Button>
            <Button
              basic
              positive
              onClick={handleView}
            >
              View
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
      <Confirm
        content="Are you sure you want to delete activity?"
        open={confirmDelete.open}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        confirmButton="Delete Activity"
      />
    </Fragment>
  );
};
