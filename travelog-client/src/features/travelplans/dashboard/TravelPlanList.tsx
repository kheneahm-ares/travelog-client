import  { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { TravelPlanListItem } from "./TravelPlanListItem";

export const TravelPlanList = () => {
  const { travelPlans } = useSelector(
    (state: RootState) => state.dashboardReducer
  );
  return (
    <Fragment>
      {travelPlans.length === 0 ? (<p>No Travel Plans</p>) : travelPlans.map((tp) => (
        <Fragment key={tp.id}>
          <TravelPlanListItem travelPlan={tp} />
        </Fragment>
      ))}
    </Fragment>
  );
};
