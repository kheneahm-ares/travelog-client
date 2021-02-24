import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { RootState } from "../../../app/store";
import { TravelPlanListItem } from "./TravelPlanListItem";

export const TravelPlanList = () => {
  const { travelPlans } = useSelector(
    (state: RootState) => state.dashboardReducer
  );
  return (
    <Fragment>
      {travelPlans.map((tp) => (
        <Fragment key={tp.id}>
          <TravelPlanListItem travelPlan={tp} />
        </Fragment>
      ))}
    </Fragment>
  );
};
