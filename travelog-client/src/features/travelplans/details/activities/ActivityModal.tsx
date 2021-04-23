import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { RootState } from "../../../../app/store";
import { ActivityForm } from "./ActivityForm";

interface IProps {
  travelPlanId: string;
}
export const ActivityModal: React.FC<IProps> = ({travelPlanId}) => {
  const { isModalOpen, selectedActivity } = useSelector(
    (state: RootState) => state.activityReducer
  );
  const { user } = useSelector(
    (state: RootState) => state.authReducer
  );
  return (
    <Modal open={isModalOpen} size="mini">
      <Modal.Content>
        <ActivityForm
          initialActivity={selectedActivity!}
          travelPlanId={travelPlanId}
          isReadOnly = {selectedActivity! && user?.userId !== selectedActivity?.hostId }
        />
      </Modal.Content>
    </Modal>
  );
};
