import moment from "moment";
import { exit } from "node:process";
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

function asdf(asdf: number, as: number[]): boolean
{
    if (as.length === 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

const validateActivityTimes = (formActivity: ITravelPlanActivity, activityRegistry: ITravelPlanActivity[]): boolean =>
{

    var isValid = true;
    
    //the activity registry are all the activities for that day, 
    //a new or updated activity time is INVALID if, there exists an activity
    //in the registry such that newActivity start and end times overlap
    if (activityRegistry && activityRegistry.length > 0)
    {
        for (let existingAct of activityRegistry)
        {
            //if it's by itself, don't compare with itself
            if (!formActivity.id || formActivity.id !== existingAct.id)
            {
                if ((formActivity.startTime <= existingAct.endTime && formActivity.endTime >= existingAct.startTime))
                {
                    console.log('invalid bc in between');
                    isValid = false;
                    break;
                }
            }

        }
    }

    return isValid;

}

export const ActivityHelper = {
    getActivitiesByDate,
    validateActivityTimes
}

