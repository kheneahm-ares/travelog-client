import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store';
import {user} from '../../auth/authSlice';

export const TravelPlanDashboard = () => {
    const currentUser = useSelector(user);
    return (
        <div>
            <h1>Hello {currentUser!.userName}</h1>
            
        </div>
    )
}
