import moment from "moment";
import { ITravelPlanActivity } from "../interfaces/ITravelPlanActivity";

const getActivitiesByDate = (activities: ITravelPlanActivity[]): Map<string, ITravelPlanActivity[]> =>
{

    //we need to group activities by the property, in our case we are defaulting to date initially
    const mapGroupedActivities = new Map<string, ITravelPlanActivity[]>();

    activities.forEach((a) =>
    {
        //need to localized date
        //ex: 03/01 1AM GMT will be 02/28 date in central
        const localizedDate = new Date(a.startTime);
        const formattedDate = moment(localizedDate).format('yyyy-MM-DD');

        //key exists with array of activities, add to array
        if (mapGroupedActivities.has(formattedDate))
        {
            var currentActivities = mapGroupedActivities.get(formattedDate);
            currentActivities?.push(a); //no need to readd to map since array is ref type
        }
        else
        {
            mapGroupedActivities.set(formattedDate, [a])
        }
    });

    return mapGroupedActivities;
}

export const ActivityHelper = {
    getActivitiesByDate
}

