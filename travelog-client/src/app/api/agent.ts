import axios, { AxiosResponse } from "axios";
import { request } from "http";
import { act } from "react-dom/test-utils";
import { AuthService } from "../auth/AuthServices";
import { ITravelPlan } from "../common/interfaces/ITravelPlan";
import { ITravelPlanActivity } from "../common/interfaces/ITravelPlanActivity";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


//add our token for each request
axios.interceptors.request.use(async (config) =>
{
    var oidcUser = await AuthService.getOidcUser();
    config.headers.Authorization = `Bearer ${oidcUser?.access_token}`;
    return config;
}, (error) =>
{
    console.log(error);

    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse): Promise<T> => 
{
    return new Promise(resolve =>
    {
        setTimeout(() =>
        {
            resolve(response.data)
        }, 500)
    });
}

const transformDate = (gmtDate: Date): Date =>
{
    const localizedDate = new Date(gmtDate);
    return localizedDate;
}

const requests = {
    get: <T>(url: string) => axios.get(url).then<T>(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const TravelPlanService = {
    list: (): Promise<ITravelPlan[]> => requests.get<ITravelPlan[]>('/TravelPlan/List'),
    details: (id: string): Promise<ITravelPlan> => requests.get<ITravelPlan>(`/TravelPlan/Details?id=${id}`)
}

const TravelPlanActivityService = {
    list: (id: string): Promise<ITravelPlanActivity[]> => requests.get<ITravelPlanActivity[]>(`/TravelPlanActivity/List?id=${id}`).then((activities) => {
        // console.log(activities);
        
        // activities.forEach((a) =>
        // {
        //     console.log(a.endTime);
        //     a.endTime = transformDate(a.endTime);
        //     console.log(a.endTime);

        //     a.startTime = transformDate(a.startTime);
        // });
        console.log(activities);
        return Promise.resolve(activities);
    }),
    update: (activity: ITravelPlanActivity) => {
        requests.put(`/TravelPlanActivity/Edit`, activity)},
}

export const APIServices = {
    TravelPlanService,
    TravelPlanActivityService
}



