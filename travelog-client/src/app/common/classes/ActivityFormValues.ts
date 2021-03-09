import { act } from "react-dom/test-utils";
import { ILocation } from "../interfaces/ILocation";
import { ITravelPlanActivity } from "../interfaces/ITravelPlanActivity";
import { ITravelPlanActivityForm } from "../interfaces/ITravelPlanActivityForm";
import { ActivityLocation } from "./ActivityLocation";

export class ActivityFormValues implements ITravelPlanActivityForm
{
    id?: string = undefined;
    travelPlanId?: string = undefined;
    name: string = '';
    startTime: Date = new Date();
    endTime: Date = new Date();
    category: string = '';
    location: ILocation = new ActivityLocation();

    constructor(activity?: ITravelPlanActivity)
    {        
        Object.assign(this, activity);
    }
}