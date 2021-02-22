import { useDispatch } from 'react-redux';
import { logIn } from '../auth/authSlice';

export const HomePage = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(logIn())}>Sign In</button>
        </div>
    )
}
