import React from 'react'
import { useSelector } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { RootState } from '../../../app/store';
import { InviteForm } from './InviteForm';

export const InviteModal = () => {
    const { isModalOpen } = useSelector(
        (state: RootState) => state.detailReducer
      );
      return (
        <Modal open={isModalOpen} size="mini">
          <Modal.Content>
            <InviteForm
            />
          </Modal.Content>
        </Modal>
      );
}
