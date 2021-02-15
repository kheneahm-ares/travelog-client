import Oidc from 'oidc-client';
import {useEffect } from 'react'

export const SignInCallBack = () => {
    const userManager = new Oidc.UserManager(
        {
            userStore: new Oidc.WebStorageStateStore({store: window.localStorage}),
            response_mode: "query" // look for code in query
        }
    )
    useEffect(() => {
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
