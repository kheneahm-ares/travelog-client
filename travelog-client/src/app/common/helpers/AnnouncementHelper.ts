import moment from "moment";
import { ITPAnnouncement } from "../interfaces/ITPAnnouncement";

const getAnnouncementsByDate = (announcements: ITPAnnouncement[]): Map<string, ITPAnnouncement[]> =>
{

    //we need to group travelPlans by the property, in our case we are defaulting to date initially
    const mapGroupedAnnouncements = new Map<string, ITPAnnouncement[]>();

    announcements.forEach((a) =>
    {
        //need to localized date
        //ex: 03/01 1AM GMT will be 02/28 date in central
        const localizedDate = new Date(a.createdDate);
        const formattedDate = moment(localizedDate).format('yyyy-MM-DD');

        //key exists with array of travelPlans, add to array
        if (mapGroupedAnnouncements.has(formattedDate))
        {
            var currentActivities = mapGroupedAnnouncements.get(formattedDate);
            currentActivities?.push(a); //no need to readd to map since array is ref type
        }
        else
        {
            mapGroupedAnnouncements.set(formattedDate, [a])
        }
    });

    return mapGroupedAnnouncements;
}


export const AnnouncementHelper = {
    getAnnouncementsByDate
}
