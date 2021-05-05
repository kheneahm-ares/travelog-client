import { AxiosResponse } from "axios";
import { history } from "../../..";
import { ITravelPlan } from "../../common/interfaces/ITravelPlan";
import { ITravelPlanStatus } from "../../common/interfaces/ITravelPlanStatus";
import { travelogAgent } from "./agent";

export const TravelPlanService = {
    list: getTravelPlans,
    statuses: getTravelPlanStatuses,
    update: updateTravelPlan,
    details: getTravelPlan,
    create: createTravelPlan,
    removeTraveler: removeTraveler,
    delete: deleteTravelPlan,
    invite: inviteTraveler
}

async function getTravelPlans(status: number): Promise<ITravelPlan[]> 
{
    try
    {
        var response: AxiosResponse<ITravelPlan[]>;
        if(status === -1)
        {
            response = await travelogAgent.get<ITravelPlan[]>('/TravelPlan/List');

        }
        else
        {
            response = await travelogAgent.get<ITravelPlan[]>(`/TravelPlan/List?status=${status}`);
        }
        return response.data;
    }
    catch (err)
    {
        throw err;
    }
}

async function getTravelPlanStatuses(): Promise<ITravelPlanStatus[]> 
{
    try
    {
        var response = await travelogAgent.get<ITravelPlanStatus[]>('/TravelPlanStatus/List');
        return response.data;
    }
    catch (err)
    {
        throw err;
    }
}
async function updateTravelPlan(travelPlan: ITravelPlan): Promise<ITravelPlan> 
{
    try
    {
        var response = await travelogAgent.put<ITravelPlan>(`/TravelPlan/Edit`, travelPlan);
        return response.data;
    }
    catch (err)
    {
        throw err;
    }
}
async function deleteTravelPlan(id: string): Promise<void> 
{
    try
    {
        var response = await travelogAgent.delete(`/TravelPlan/Delete?id=${id}`);
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
async function getTravelPlan(id: string): Promise<ITravelPlan> 
{
    try
    {
        var response = await travelogAgent.get<ITravelPlan>(`/TravelPlan/Details?id=${id}`);
        return response.data;
    }
    catch (err)
    {
        const status = err.response.status;
        if (status === 403)
        {
            history.push('/forbidden');
        }
        throw err;
    }
}

async function createTravelPlan(travelPlan: ITravelPlan): Promise<ITravelPlan>
{
    try
    {
        var response = await travelogAgent.post('/TravelPlan/Create', travelPlan);
        if (response.status < 200 || response.status > 300)
        {
            throw new Error(`${response.status}: Error creating travel plan`);
        }
        return response.data;
    }
    catch (err)
    {
        throw err;
    }
}

async function removeTraveler(username: string, travelPlanId: string): Promise<void>
{
    try
    {
        var response = await travelogAgent.post(`/TravelPlan/RemoveTraveler?travelerUsername=${username}&travelPlanId=${travelPlanId}`, {});
        if (response.status < 200 || response.status > 300)
        {
            throw new Error(`${response.status}: Error removing traveler from travel plan`);
        }
    }
    catch (err)
    {
        throw err;
    }
}

async function inviteTraveler(inviteeId: string, travelPlanId: string): Promise<void>
{
    try
    {
        var response = await travelogAgent.post(`/TravelPlan/CreateInvitation?inviteeUsername=${inviteeId}&travelPlanId=${travelPlanId}`, {});
        if (response.status < 200 || response.status > 300)
        {
            throw new Error(`${response.status}: ${response.data.message}`);
        }
    }
    catch (err)
    {
        throw err;
    }
}