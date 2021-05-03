import { ITravelPlanStatus } from "./ITravelPlanStatus";
import { ITravelPlanTraveler } from "./ITravelPlanTraveler";

export interface ITravelPlan
{
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    createdById: string;
    travelers: ITravelPlanTraveler[];
    travelPlanStatus: ITravelPlanStatus;
}