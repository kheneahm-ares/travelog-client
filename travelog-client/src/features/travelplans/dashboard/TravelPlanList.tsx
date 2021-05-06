import moment from "moment";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Label } from "semantic-ui-react";
import { getTravelPlansByDate } from "./dashboardSlice";
import { TravelPlanListItem } from "./TravelPlanListItem";

export const TravelPlanList = () => {
  const groupedTravelPlans = useSelector(getTravelPlansByDate());
  return (
    <Fragment>
      {groupedTravelPlans.size === 0 ? (
        <p>No Travel Plans</p>
      ) : (
        Array.from(groupedTravelPlans).map(([key, travelPlans]) => (
          <Fragment key={key}>
            <Label size='large'>{moment(key).format("MMM Do YYYY")}</Label>
            {travelPlans.map((tp) => (
              <Fragment key={tp.id}>
                <TravelPlanListItem travelPlan={tp} />
              </Fragment>
            ))}
          </Fragment>
        ))
      )}
    </Fragment>
  );
};
