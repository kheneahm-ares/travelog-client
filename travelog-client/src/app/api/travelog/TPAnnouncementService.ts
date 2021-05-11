import { ITPAnnouncement } from "../../common/interfaces/ITPAnnouncement"
import { ITPAnnouncementEnvelope } from "../../common/interfaces/ITPAnnouncementEnvelope";
import { travelogAgent } from "./agent"

export const TPAnnouncementService = {
    list: getTPAnnouncements,
    edit: editTPAnnouncement,
    create: createTPAnnouncement,
    delete: deleteTPAnnouncement

}


async function getTPAnnouncements(travelPlanID: string, limit: number, offset: number): Promise<ITPAnnouncementEnvelope>
{
    try
    {
        const announcements = await travelogAgent.get<ITPAnnouncementEnvelope>
                                                (`/TravelPlan/Announcement/List?travelPlanId=${travelPlanID}&limit=${limit}&offset=${offset}`);
        return announcements.data;
    }
    catch (exc)
    {
        throw exc;
    }
}

async function deleteTPAnnouncement(announcementId: string): Promise<void>
{
    try
    {
        await travelogAgent.delete(`/TravelPlan/Announcement/Delete?announcementId=${announcementId}`);
    }
    catch (exc)
    {
        throw exc;
    }
}
async function editTPAnnouncement(announcement: ITPAnnouncement): Promise<ITPAnnouncement>
{
    try
    {
        const updatedAnnouncement = await travelogAgent.put<ITPAnnouncement>(`/TravelPlan/Announcement/Edit`, announcement);
        return updatedAnnouncement.data;
    }
    catch (exc)
    {
        throw exc;
    }
}

async function createTPAnnouncement(announcement: ITPAnnouncement): Promise<ITPAnnouncement>
{
    try
    {
        const newAnnouncement = await travelogAgent.post<ITPAnnouncement>(`/TravelPlan/Announcement/Create`, announcement);
        return newAnnouncement.data;
    }
    catch (exc)
    {
        throw exc;
    }
}