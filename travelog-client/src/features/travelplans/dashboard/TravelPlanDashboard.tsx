import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { getUserTravelPlansAsync } from "./dashboardSlice";

export const TravelPlanDashboard = () => {
  const { isTravelPlansLoading, travelPlans } = useSelector(
    (state: RootState) => state.dashboardReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getUserTravelPlansAsync());
      
  }, [dispatch]);

  return (
      <Fragment>
          {isTravelPlansLoading ? (<h1>Loading...</h1>) : (travelPlans.map((tp) => (
              <Fragment key={tp.id}>
                  <h1>{tp.name}</h1>
              </Fragment>
          )))}
      </Fragment>

  );
};
