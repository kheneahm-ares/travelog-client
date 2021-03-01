import { act } from "react-dom/test-utils";
import { ITravelPlanActivity } from "../interfaces/ITravelPlanActivity";
import { ITravelPlanActivityForm } from "../interfaces/ITravelPlanActivityForm";

export class ActivityFormValues implements ITravelPlanActivityForm
{
    id?: string = undefined;
    travelPlanId?: string = undefined;
    name: string = '';
    startTime: string = '';
    endTime: string = '';
    category: string = '';
    location: string = ''

    constructor(activity?: ITravelPlanActivity)
    {
        if(activity == null)
        {
            this.startTime = new Date().toString();
            this.endTime = new Date().toString();
        }
        
        Object.assign(this, activity);
    }
}