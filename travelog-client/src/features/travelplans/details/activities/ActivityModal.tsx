import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { useAppDispatch } from "../../../../app/customHooks";
import { RootState } from "../../../../app/store";
import { ActivityForm } from "./ActivityForm";
import { closeModal } from "./activitySlice";

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
          isReadOnly = {user?.userId !== selectedActivity?.hostId}
        />
      </Modal.Content>
    </Modal>
  );
};
