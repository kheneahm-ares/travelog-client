import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { RootState } from "../../../app/store";
import { ActivityForm } from "./ActivityForm";

export const ActivityModal = () => {
  const { isModalOpen, selectedActivity, travelPlan} = useSelector(
    (state: RootState) => state.detailReducer
  );
  return (
    <Modal open={isModalOpen} size="mini">
      <Modal.Content>
          <ActivityForm initialActivity={selectedActivity!} travelPlanId={travelPlan?.id!}/>
      </Modal.Content>
    </Modal>
  );
};
