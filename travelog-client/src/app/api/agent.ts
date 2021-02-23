import axios, { AxiosResponse } from "axios";
import { request } from "http";
import { AuthService } from "../auth/AuthServices";
import { ITravelPlan } from "../common/interfaces/ITravelPlan";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


//add our token for each request
axios.interceptors.request.use(async (config) => {
    var oidcUser = await AuthService.getOidcUser();
    config.headers.Authorization = `Bearer ${oidcUser?.access_token}`; 
    return config;
}, (error) => {
    console.log(error);

    return Promise.reject(error);
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const TravelPlanService = {
    list: (): Promise<ITravelPlan[]> => requests.get('/TravelPlan/List')
}

export const APIServices = {
    TravelPlanService
}



