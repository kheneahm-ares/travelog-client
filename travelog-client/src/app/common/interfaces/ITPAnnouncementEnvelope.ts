import { ITPAnnouncement } from "./ITPAnnouncement";

export interface ITPAnnouncementEnvelope
{
    announcementDtos: ITPAnnouncement[],
    announcementCount: number

}