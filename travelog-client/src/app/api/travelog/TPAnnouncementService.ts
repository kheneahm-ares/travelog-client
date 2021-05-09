import { ITPAnnouncement } from "../../common/interfaces/ITPAnnouncement"
import { travelogAgent } from "./agent"

export const TPAnnouncementService = {
    list: getTPAnnouncements

}


async function getTPAnnouncements(travelPlanID: string): Promise<ITPAnnouncement[]>
{
    try
    {
        const announcements = await travelogAgent.get<ITPAnnouncement[]>(`/TravelPlan/Announcement/List?travelPlanId=${travelPlanID}`);
        return announcements.data;
    }
    catch (exc)
    {
        throw exc;
    }
}