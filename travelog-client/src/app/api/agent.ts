import axios, { AxiosResponse } from "axios";
import { request } from "http";
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

const responseBody = <T>(response: AxiosResponse): Promise<T> => response.data;

const responseStatus = (response: AxiosResponse) => response.status;
// {
//     return new Promise(resolve =>
//     {
//         setTimeout(() =>
//         {
//             resolve(response.data)
//         }, 500)
//     });
// }

const requests = {
    get: <T>(url: string) => axios.get(url).then<T>(responseBody),
    post: <T>(url: string, body: {}) => axios.post(url, body).then<T>(responseBody),
    put: <T>(url: string, body: {}) => axios.put(url, body).then<T>(responseBody),
    delete: (url: string) => axios.delete(url).then(responseStatus),
}

const TravelPlanService = {
    list: (): Promise<ITravelPlan[]> => requests.get<ITravelPlan[]>('/TravelPlan/List'),
    update: (travelPlan: ITravelPlan): Promise<ITravelPlan> =>
        requests.put<ITravelPlan>(`/TravelPlan/Edit`, travelPlan),
    details: (id: string): Promise<ITravelPlan> => requests.get<ITravelPlan>(`/TravelPlan/Details?id=${id}`),
    create: (travelPlan: ITravelPlan): Promise<number> => requests.post('/TravelPlan/Create', travelPlan),
    delete: (id: string): Promise<number> => requests.delete(`/TravelPlan/Delete?id=${id}`)
}

const TravelPlanActivityService = {
    list: (id: string): Promise<ITravelPlanActivity[]> => requests.get<ITravelPlanActivity[]>(`/TravelPlanActivity/List?id=${id}`),
    update: (activity: ITravelPlanActivity): Promise<ITravelPlanActivity> =>
        requests.put<ITravelPlanActivity>(`/TravelPlanActivity/Edit`, activity),
    delete: (id: string): Promise<number> => requests.delete(`/TravelPlanActivity/Delete?id=${id}`),
    create: (activity: ITravelPlanActivity): Promise<ITravelPlanActivity> => requests.post('/TravelPlanActivity/Create', activity)
}

export const APIServices = {
    TravelPlanService,
    TravelPlanActivityService
}



