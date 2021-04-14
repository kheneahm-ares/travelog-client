import React, { Fragment, useState } from "react";
import { Button, Card, Confirm } from "semantic-ui-react";
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
  isHost: boolean;
}

export const ActivityCard: React.FC<IProps> = ({
  activity,
  travelPlanId,
  isHost,
}) => {
  const { deletingActivity, activityTarget } = useAppSelector(
    (state: RootState) => state.activityReducer
  );
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
  function handleView() {
    dispatch(openModal(activity));
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
            {isHost && (
              <Button
                basic
                negative
                onClick={openConfirmDelete}
                loading={deletingActivity && activityTarget === activity.id}
                name={activity.id}
              >
                Delete
              </Button>
            )}

            <Button basic positive onClick={handleView}>
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
