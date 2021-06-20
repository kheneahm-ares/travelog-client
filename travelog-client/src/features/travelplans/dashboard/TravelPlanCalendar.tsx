import { Fragment, useState } from "react";
import { useAppSelector } from "../../../app/customHooks";
import { DateRange, Range } from "react-date-range";
import { RootState } from "../../../app/store";
import { Container, Grid, Header } from "semantic-ui-react";

export const TravelPlanCalendar = () => {
  const { filteredTravelPlans } = useAppSelector(
    (state: RootState) => state.dashboardReducer
  );
  const tpRanges = filteredTravelPlans.map((tp) => {
    const newRange: Range = {
      startDate: new Date(tp.startDate),
      endDate: new Date(tp.endDate),
      key: "selection",
    };
    return newRange;
  });
  return (
    <Container>
      <Header content="Calendar" icon="calendar" color="purple"  />
      <DateRange
        showDateDisplay={false}
        //force preview change to not do anything
        onPreviewChange={() => {}}
        ranges={tpRanges}
      />
    </Container>
  );
};
