import { ITPAnnouncement } from "../interfaces/ITPAnnouncement";

export class AnnouncementFormValues 
{
    title: string = "";
    description: string = "";
    createdDate: Date = new Date();
    travelPlanId: string = "";
    travelPlanActivityId: string | undefined = undefined;

    constructor(announcement?: ITPAnnouncement)
    {
        Object.assign(this, announcement);
    }
}