import { useState } from "react";
import { useAppSelector } from "../../../app/customHooks";
import { DateRange, Range } from "react-date-range";
import { RootState } from "../../../app/store";

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
    <div>
      <DateRange
        showDateDisplay={false}
        //force preview change to not do anything
        onPreviewChange={() => {}}
        ranges={tpRanges}
      />
    </div>
  );
};
