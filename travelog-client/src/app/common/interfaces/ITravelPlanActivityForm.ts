export interface ITravelPlanActivityForm
{
    id?: string;
    travelPlanId?: string;
    name: string;
    startTime: Date;
    endTime: Date;
    category: string;
    location: string;
}