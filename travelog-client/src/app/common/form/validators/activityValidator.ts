import moment from "moment";
import { combineValidators, isRequired } from "revalidate";

export const activityValidator = combineValidators({
    name: isRequired("Name"),
    startTime: (startDateVal: Date, allValues: any) =>
    {
        const endDate: Date = allValues.endTime;

        const startEndDiff = moment(startDateVal).diff(moment(endDate), 'minutes');

        if (startEndDiff > 0)
        {
            return 'Invalid Start Time';
        }
    },
    endTime: (endDateVal: Date, allValues: any) =>
    {
        const startDate: Date = allValues.startTime;

        const endStartDiff = moment(endDateVal).diff(moment(startDate), 'minutes');

        if (endStartDiff < 0)
        {
            return 'Invalid End Time';
        }
    },
    category: isRequired("Category"),
    location: isRequired("Location"),
})