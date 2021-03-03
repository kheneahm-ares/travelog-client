export interface IUserManagerConfig 
{
    userStore: any,
    authority: string,
    client_id: string,
    response_type: string,
    redirect_uri: string,
    scope: string,
    post_logout_redirect_uri: string,
}