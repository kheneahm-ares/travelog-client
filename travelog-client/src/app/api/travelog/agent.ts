import axios from "axios";
import { AuthService } from "../../auth/AuthServices";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


//add our token for each request
axios.interceptors.request.use(async (config) =>
{
    var oidcUser = await AuthService.getOidcUser();
    config.headers.Authorization = `Bearer ${oidcUser?.access_token}`;
    return config;
}, (error) =>
{
    return Promise.reject(error);
});

export { axios as travelogAgent };



