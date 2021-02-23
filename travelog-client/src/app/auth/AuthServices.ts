import Oidc, { UserManager } from "oidc-client"
import { history } from "../..";
import { IUser } from "../common/interfaces/IUser";
import { IUserManagerConfig } from "../common/interfaces/IUserManagerConfig";


const userConfig: IUserManagerConfig =
{
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
    authority: "https://localhost:5001/",
    client_id: "travelog_react_client",
    redirect_uri: "http://localhost:3000/auth/signin-oidc",
    response_type: "code",
    scope: "openid profile TravelogApi extraprofile.scope",
    post_logout_redirect_uri: "http://localhost:3000/"
}

const userManager = new UserManager(userConfig);

const signInRedirect = async () => 
{
    var oidcUser = await userManager.getUser();

    //only redirect to auth server if no user in storage, else redirec to dashboard
    if(!oidcUser)
    {
        await userManager.signinRedirect();
    }
    history.push('/travelplans');
}

const signInUserCallback = async (): Promise<IUser> => {
    //piggy backs off existing user manager configs 
    const callbackManager = new Oidc.UserManager(
        {
            userStore: new Oidc.WebStorageStateStore({store: window.localStorage}),
            response_mode: "query" // look for code in query
        }
    );
    try
    {
        const user = await callbackManager.signinCallback();
        const appUser: IUser = {
            userName: user.profile.name!,
            token: user.access_token
        }
        return appUser;
    }
    catch(e)
    {
        return {
            userName: '',
            token: ''
        }
        

    }

}
const getOidcUser = async (): Promise<Oidc.User | null> => {
    return await userManager.getUser();
}

const hasToken = (): boolean => 
{
    const token = window.localStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`);
    if(token == null) return false;
    
    return true;

}

const signOut = async (): Promise<void> => 
{
    userManager.signoutRedirect();
}

export const AuthService = {
    signInUserCallback,
    signInRedirect,
    getOidcUser,
    signOut,
    hasToken
}