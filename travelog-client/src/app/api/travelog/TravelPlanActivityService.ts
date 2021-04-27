import { ITravelPlanActivity } from "../../common/interfaces/ITravelPlanActivity";
import { travelogAgent } from "./agent";

export const TravelPlanActivityService = {
    list: getTPActivities,
    update: updateActivity,
    delete: deleteActivity,
    create: createActivity
}

async function getTPActivities(tpID: string): Promise<ITravelPlanActivity[]>
{
    try
    {
        const response = await travelogAgent.get<ITravelPlanActivity[]>(`/TravelPlanActivity/List?id=${tpID}`);
        return response.data;
    }
    catch (err)
    {
        throw err;
    }
}

async function createActivity(activity: ITravelPlanActivity): Promise<ITravelPlanActivity>
{
    try
    {
        const response = await travelogAgent.post('/TravelPlanActivity/Create', activity);
        return response.data;
    }
    catch (err)
    {
        throw err;
    }
}

async function updateActivity(activity: ITravelPlanActivity): Promise<ITravelPlanActivity>
{
    try
    {
        const response = await travelogAgent.put<ITravelPlanActivity>(`/TravelPlanActivity/Edit`, activity);
        return response.data;
    }
    catch (err)
    {
        console.log(err);
        throw err;
    }
}

async function deleteActivity(id: string): Promise<void>
{
    try
    {
        const response = await travelogAgent.delete(`/TravelPlanActivity/Delete?id=${id}`);
        if (response.status < 200 || response.status > 300)
        {
            throw new Error(`${response.status}: Error deleting travel plan`);
        }
    }
    catch (err)
    {
        throw err;
    }
}