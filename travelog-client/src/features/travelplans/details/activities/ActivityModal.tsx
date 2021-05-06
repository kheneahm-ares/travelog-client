import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { AuthService } from "../../../../app/auth/AuthServices";
import { RootState } from "../../../../app/store";
import { ActivityForm } from "./ActivityForm";

interface IProps {
  travelPlanId: string;
}
export const ActivityModal: React.FC<IProps> = ({travelPlanId}) => {
  const { isModalOpen, selectedActivity } = useSelector(
    (state: RootState) => state.activityReducer
  );
  const userId = AuthService.getAppUser()?.userId;
  return (
    <Modal open={isModalOpen} size="mini">
      <Modal.Content>
        <ActivityForm
          initialActivity={selectedActivity!}
          travelPlanId={travelPlanId}
          isReadOnly = {selectedActivity! && userId !== selectedActivity?.hostId }
        />
      </Modal.Content>
    </Modal>
  );
};
