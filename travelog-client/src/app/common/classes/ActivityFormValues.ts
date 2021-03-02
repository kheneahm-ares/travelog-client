import { act } from "react-dom/test-utils";
import { ITravelPlanActivity } from "../interfaces/ITravelPlanActivity";
import { ITravelPlanActivityForm } from "../interfaces/ITravelPlanActivityForm";

export class ActivityFormValues implements ITravelPlanActivityForm
{
    id?: string = undefined;
    travelPlanId?: string = undefined;
    name: string = '';
    startTime: Date = new Date();
    endTime: Date = new Date();
    category: string = '';
    location: string = '';

    constructor(activity?: ITravelPlanActivity)
    {        
        Object.assign(this, activity);
    }
}