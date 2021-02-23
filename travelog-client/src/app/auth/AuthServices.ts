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
    scope: "openid profile TravelogApi extraprofile.scope"
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
    const user = await callbackManager.signinCallback();
    const appUser: IUser = {
        userName: user.profile.name!,
        token: user.access_token
    }
    return appUser;
}
const getOidcUser = async (): Promise<Oidc.User | null> => {
    return await userManager.getUser();
}

export const AuthService = {
    signInUserCallback,
    signInRedirect,
    getOidcUser
}