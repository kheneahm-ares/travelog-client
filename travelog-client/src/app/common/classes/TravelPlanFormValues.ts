import { ITravelPlan } from "../interfaces/ITravelPlan";
import { ITravelPlanForm } from "../interfaces/ITravelPlanForm";

export class TravelPlanFormValues implements ITravelPlanForm
{
    id?: string = undefined;
    name: string = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
    description: string = '';
    createdById: string = '';

    constructor(travelPlan?: ITravelPlan)
    {
        //map and assing props
        this.id = travelPlan?.id;
        this.name = travelPlan?.name!;
        this.description = travelPlan?.description!;
        this.createdById = travelPlan?.createdById!;
        this.startDate = new Date(travelPlan?.startDate!);
        this.endDate = new Date(travelPlan?.endDate!);
    }
}