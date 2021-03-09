import { ActivityLocation } from "../classes/ActivityLocation";
import { ILocation } from "./ILocation";

export interface ITravelPlanActivity
{
    id: string;
    travelPlanId: string;
    hostId: string;
    name: string;
    startTime: Date;
    endTime: Date;
    category: string;
    location: ILocation;
}