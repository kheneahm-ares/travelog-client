import Oidc, { UserManager } from "oidc-client"
import { history } from "../..";
import { IUser } from "../common/interfaces/IUser";
import { IUserManagerConfig } from "../common/interfaces/IUserManagerConfig";

//where we will redirect after successful sign in from IDP
const REDIRECT_URI = "http://localhost:3000/auth/signin-oidc";
const SILENT_REDIRECT_URI = "http://localhost:3000/auth/signin-silent-oidc";
const POST_LOGOUT_REDIRECT_URI = "http://localhost:3000/"; //redirect back to our home page
const RESPONSE_TYPE = "code"; // using code flow so we expect some code
const SCOPE = "openid profile TravelogApi extraprofile.scope";
const OIDC_REQUEST_PREFIX = "travelog.";

const userConfig: IUserManagerConfig =
{
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
    authority: process.env.REACT_APP_AUTH_URL as string,
    client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID as string,
    redirect_uri: REDIRECT_URI,
    silent_redirect_uri: SILENT_REDIRECT_URI,
    response_type: RESPONSE_TYPE,
    scope: SCOPE,
    post_logout_redirect_uri: POST_LOGOUT_REDIRECT_URI,
    stateStore: new Oidc.WebStorageStateStore({ prefix: OIDC_REQUEST_PREFIX }) //change prefix to use app
}

const userManager = new UserManager(userConfig);

//events
userManager.events.addAccessTokenExpiring(() =>
{
    userManager.signinSilent();
});

userManager.events.addAccessTokenExpired(async () =>
{
    await removeStateKeys();
    userManager.signinRedirect();
});


const removeStateKeys = async () =>
{
    //see if the keys are just stale
    await userManager.clearStaleState();

    //if there are more, remove them
    const oidcKeys = await userManager.settings.stateStore?.getAllKeys();
    if (oidcKeys?.length! > 0)
    {
        oidcKeys?.forEach((k) =>
        {
            if (!k.startsWith(OIDC_REQUEST_PREFIX))
            {
                userManager.settings.stateStore?.remove(k);
            }
        });
    }
}

const signInRedirect = async () => 
{
    const oidcUser = await userManager.getUser();

    //only redirect to auth server if no user in storage, else redirec to dashboard
    if (!oidcUser)
    {
        //signInRedirect calls createSignInrequest which adds to store
        //remove keys before adding new one
        await removeStateKeys();

        await userManager.signinRedirect();
    }
    history.push('/travelplans');
}
const registerUser = async () =>
{
    await removeStateKeys();

    //signInRequest will add to userstore
    //si:r indicates that our sign in is a redirect callback
    const signInRequest = await userManager.createSigninRequest({ request_type: "si:r" });

    //create encoded return url 
    const redirectUri = encodeURIComponent(REDIRECT_URI);
    const responseType = encodeURIComponent(RESPONSE_TYPE);
    const scope = encodeURIComponent(SCOPE);
    const state = encodeURIComponent(signInRequest.state._id);
    const code_challenge = encodeURIComponent(signInRequest.state._code_challenge);
    const client_id = encodeURIComponent(signInRequest.state._client_id);
    const code_challenge_method = encodeURIComponent("S256");
    const response_mode = encodeURIComponent("query");
    const authUrl = "/connect/authorize/callback" +
        "?client_id=" + client_id +
        "&redirect_uri=" + redirectUri +
        "&response_type=" + responseType +
        "&scope=" + scope +
        "&state=" + state +
        "&code_challenge=" + code_challenge +
        "&code_challenge_method=" + code_challenge_method +
        "&response_mode=" + response_mode;
    const returnUrl = encodeURIComponent(authUrl);

    window.location.href = `${signInRequest.state._authority}Auth/Register?returnUrl=${returnUrl}`;
}

const signInUserCallback = async (): Promise<IUser> =>
{
    //piggy backs off existing user manager configs 
    //this callback will use the state store to verify the callback state and
    //the state we have in our store
    const callbackManager = new Oidc.UserManager(
        {
            userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
            response_mode: "query", // look for code in query,
            stateStore: new Oidc.WebStorageStateStore({ prefix: OIDC_REQUEST_PREFIX })
        }
    );
    try
    {
        const user = await callbackManager.signinCallback();
        const appUser: IUser = {
            userId: user!.profile.sub,
            userName: user.profile.name!,
            token: user.access_token
        }
        return appUser;
    }
    catch (e)
    {
        console.log(e);
        return {
            userId: '',
            userName: '',
            token: ''
        }
    }
    finally
    {
        //for every callback, remove the state keys
        await removeStateKeys();
    }

}

const signInSilentCallback = async () =>
{
    //piggy backs off existing user manager configs 
    //this callback will use the state store to verify the callback state and
    //the state we have in our store
    const callbackManager = new Oidc.UserManager(
        {
            userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
            response_mode: "query", // look for code in query,
            stateStore: new Oidc.WebStorageStateStore({ prefix: OIDC_REQUEST_PREFIX })
        }
    );

    try
    {
        //this will automatically update our user in storage
        await callbackManager.signinSilentCallback();
    }
    catch (e)
    {
        console.log('problem signing in silently');
    }

    try
    {
        const user = await userManager.getUser();
        const appUser: IUser = {
            userId: user!.profile.sub,
            userName: user!.profile.name!,
            token: user!.access_token
        }
        return appUser;
    }
    catch (e)
    {
        console.log('problem getting user from storage');
        return {
            userId: '',
            userName: '',
            token: ''
        } 
    }

}
const getOidcUser = async (): Promise<Oidc.User | null> =>
{
    return await userManager.getUser();
}

const hasToken = (): boolean => 
{
    const token = window.localStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`);
    if (token == null) return false;

    return true;

}

const signOut = async (): Promise<void> => 
{
    //remove state keys upon sign out
    await removeStateKeys();
    await userManager.signoutRedirect();
}

export const AuthService = {
    signInUserCallback,
    signInRedirect,
    registerUser,
    getOidcUser,
    signOut,
    hasToken,
    signInSilentCallback
}