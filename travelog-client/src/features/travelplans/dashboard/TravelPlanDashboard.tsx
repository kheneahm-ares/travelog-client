import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store';

export const TravelPlanDashboard = () => {
    const {user: currentUser} = useSelector((state: RootState) => state.authReducer);

    return (
        <div>
            <h1>Hello {currentUser!.userName}</h1>
        </div>
    )
}
