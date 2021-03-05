import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { useAppDispatch } from "../../../../app/customHooks";
import { RootState } from "../../../../app/store";
import { ActivityForm } from "./ActivityForm";
import { closeModal } from "./activitySlice";

export const ActivityModal = () => {
  const { isModalOpen, selectedActivity} = useSelector(
    (state: RootState) => state.activityReducer
  );
  const dispatch = useAppDispatch();
  return (
    <Modal open={isModalOpen} size="mini">
      <Modal.Content>
          <ActivityForm initialActivity={selectedActivity!} travelPlanId={selectedActivity?.travelPlanId!}/>
      </Modal.Content>
    </Modal>
  );
};
