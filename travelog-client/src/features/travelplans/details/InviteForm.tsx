import React from 'react'
import { Button } from 'semantic-ui-react'
import { useAppDispatch } from '../../../app/customHooks'
import { closeModal } from './detailSlice';

export const InviteForm = () => {
    const dispatch = useAppDispatch();
    function handleFormClose()
    {
        dispatch(closeModal());
    }
    return (
        <div>
            <input type="text"/>
            <Button
                content="Close"
                // disabled={formSubmitting}
                onClick={handleFormClose}
              />
        </div>
    )
}
