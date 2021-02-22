import {useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IsLoggedIn, signInUserAsync } from './authSlice';
import {history} from '../../index';
import { useAppDispatch } from '../../app/customHooks';

export const SignInCallBack = () => {
    const isUserLoggedIn = useSelector(IsLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(signInUserAsync())
        if(isUserLoggedIn)
        {
            history.push('/travelplans');
        }

    }, [isUserLoggedIn, dispatch])
    
    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}
