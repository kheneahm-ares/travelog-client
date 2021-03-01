import { ITravelPlanTraveler } from "./ITravelPlanTraveler";

export interface ITravelPlan
{
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    createdById: string;
    travelers: ITravelPlanTraveler[];
}