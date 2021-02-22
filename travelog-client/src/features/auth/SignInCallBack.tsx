import {useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn, signInUserAsync } from './authSlice';
import {history} from '../../index';
import { useAppDispatch } from '../../app/customHooks';

export const SignInCallBack = () => {
    const isUserLoggedIn = useSelector(isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(signInUserAsync())
        if(isUserLoggedIn)
        {
            history.push('/travelplans');
        }

    }, [isUserLoggedIn])
    
    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}
