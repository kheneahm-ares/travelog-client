import moment from "moment";
import { combineValidators, isRequired } from "revalidate";

export const travelPlanValidator = combineValidators({
    name: isRequired("Name"),
    startDate: (startDateVal: Date, allValues: any) =>
    {
        const endDate: Date = allValues.endDate;

        const startEndDiff = moment(startDateVal).diff(moment(endDate), 'days');

        if (startEndDiff > 0)
        {
            return 'Invalid Start Date';
        }
    },
    endDate: (endDateVal: Date, allValues: any) =>
    {
        const startDate: Date = allValues.startDate;

        const endStartDiff = moment(endDateVal).diff(moment(startDate), 'days');

        if (endStartDiff < 0)
        {
            return 'Invalid End Date';
        }
    },
    description: isRequired("Description"),
})