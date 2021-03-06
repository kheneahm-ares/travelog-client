import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { TravelogConstants } from "../../../app/common/constants/Constants";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { loadTravelPlan, resetState } from "./manageSlice";
import { TravelPlanForm } from "./TravelPlanForm";
import { history } from "../../..";

interface IProps extends RouteComponentProps<{ id: string }> {}

export const TravelPlanManage: React.FC<IProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { isLoading, travelPlan } = useSelector(
    (state: RootState) => state.manageReducer
  );

  useEffect(() => {
    //load travel plan
    if (match.params.id) {
      dispatch(loadTravelPlan(match.params.id)).then((actionResult: any) => {
        if(actionResult.error && actionResult.error.message === TravelogConstants.FORBIDDEN)
        {
          history.push('/forbidden');
        }
      });
    }
    return () => {
      //since edit and create share same travelplan state,
      //we need to reset upon unmount
      dispatch(resetState());
    };
  }, [dispatch, match.params.id]);

  if (isLoading) {
    return <LoadingComponent content="Loading Travel Plan" />;
  }

  return <TravelPlanForm initialTravelPlan={travelPlan} />;
};
