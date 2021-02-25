import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { loadTravelPlanActivities } from "./detailSlice";

interface IProps {
  travelPlanId: string;
}

export const TravelPlanActivities: React.FC<IProps> = ({ travelPlanId }) => {
  const dispatch = useAppDispatch();
  const { travelPlanActivities } = useSelector(
    (state: RootState) => state.detailReducer
  );

  useEffect(() => {
    dispatch(loadTravelPlanActivities(travelPlanId));
  }, [dispatch, travelPlanId]);
  return (
    <Fragment>
      {travelPlanActivities?.map((a) => (
        <Fragment key={a.id}>
          <h1>{a.name}</h1>
        </Fragment>
      ))}
    </Fragment>
  );
};
