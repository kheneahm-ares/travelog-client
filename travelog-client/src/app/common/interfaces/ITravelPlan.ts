export interface ITravelPlan
{
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    description: string,
    createdById: string
    travelers: {}
}