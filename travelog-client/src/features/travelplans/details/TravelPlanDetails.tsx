import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, RouteProps } from "react-router";
import { useAppDispatch } from "../../../app/customHooks";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store";
import { loadTravelPlan } from "./detailSlice";

interface IDetailParams {}
interface IProps extends RouteComponentProps<{ id: string }> {}

export const TravelPlanDetails: React.FC<IProps> = ({ match, history }) => {
  const dispatch = useAppDispatch();
  const {travelPlan, isLoading} = useSelector((state: RootState) => state.detailReducer)

  useEffect(() => {
    dispatch(loadTravelPlan(match.params.id));
  }, [dispatch, match.params.id]);

  if(isLoading){
      return <LoadingComponent content='Loading Travel Plan'/>
  }

  return <div>{travelPlan?.name}!</div>;
};
