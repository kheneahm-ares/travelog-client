export interface ITravelPlanActivity
{
    id: string;
    travelPlanId: string;
    hostId: string;
    name: string;
    startTime: Date;
    endTime: Date;
    category: string;
    location: string;
}