import { UserManager } from "oidc-client"

interface IUserManagerConfig 
{
    authority: string,
    client_id: string,
    response_type: string,
    redirect_uri: string,
    scope: string

}
const userConfig: IUserManagerConfig =
{
    authority: "https://localhost:5001/",
    client_id: "travelog_react_client",
    redirect_uri: "http://localhost:3000/auth/signin-oidc",
    response_type: "code",
    scope: "openid TravelogApi"
}

export const userManager = new UserManager(userConfig)

