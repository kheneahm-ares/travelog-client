import React from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import { useAppDispatch } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { ActivityForm } from "./ActivityForm";
import { closeModal } from "./detailSlice";

export const ActivityModal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, selectedActivity } = useSelector(
    (state: RootState) => state.detailReducer
  );
  return (
    <Modal open={isModalOpen} onClose={dispatch(closeModal)} size="mini">
      <Modal.Content>
          <ActivityForm />
        {/* <h1>{selectedActivity?.name}</h1> */}
      </Modal.Content>
    </Modal>
  );
};
