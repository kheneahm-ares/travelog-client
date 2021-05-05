import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { TravelPlanStatusEnum } from "../../../app/common/enums/TravelPlanStatusEnum";
import { useAppDispatch } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { loadUserTravelPlansAsync } from "./dashboardSlice";
import { TravelPlanList } from "./TravelPlanList";
import { TravelPlanListPlaceholder } from "./TravelPlanListPlaceholder";

export const TravelPlanBody = () => {
  const { isTravelPlansLoading } = useSelector(
    (state: RootState) => state.dashboardReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserTravelPlansAsync(TravelPlanStatusEnum.All));
  }, [dispatch]);

  return (
    <Fragment>
      {isTravelPlansLoading ? (
        <TravelPlanListPlaceholder />
      ) : (
        <TravelPlanList />
      )}
    </Fragment>
  );
};
