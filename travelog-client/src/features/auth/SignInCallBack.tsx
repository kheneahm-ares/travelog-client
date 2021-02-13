import React, { useEffect } from 'react'
import { userManager } from '../../auth/AuthServices'

export const SignInCallBack = () => {

    useEffect(() => {
        userManager.getUser().then(user =>
            {
                console.log(user);
            });
        userManager.signinCallback().then(res => {
            console.log(res);
        });



    }, [])
    
    return (
        <div>
            <h1>CallBack</h1>
            
        </div>
    )
}
