import moment from "moment";
import { ITravelPlan } from "../interfaces/ITravelPlan";

const getTravelPlanByDate = (travelPlans: ITravelPlan[]): Map<string, ITravelPlan[]> =>
{

    //we need to group travelPlans by the property, in our case we are defaulting to date initially
    const mapGroupedTP = new Map<string, ITravelPlan[]>();

    travelPlans.forEach((tp) =>
    {
        //need to localized date
        //ex: 03/01 1AM GMT will be 02/28 date in central
        const localizedDate = new Date(tp.startDate);
        const formattedDate = moment(localizedDate).format('yyyy-MM-DD');

        //key exists with array of travelPlans, add to array
        if (mapGroupedTP.has(formattedDate))
        {
            var currentActivities = mapGroupedTP.get(formattedDate);
            currentActivities?.push(tp); //no need to readd to map since array is ref type
        }
        else
        {
            mapGroupedTP.set(formattedDate, [tp])
        }
    });

    return mapGroupedTP;
}


export const TravelPlanHelper = {
    getTravelPlanByDate
}

