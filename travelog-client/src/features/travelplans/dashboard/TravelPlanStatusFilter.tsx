import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Grid, Radio, Search, Select } from "semantic-ui-react";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { TravelPlanStatusEnum } from "../../../app/common/enums/TravelPlanStatusEnum";
import { useAppDispatch } from "../../../app/customHooks";
import { filterTravelPlans, loadUserTravelPlansAsync } from "./dashboardSlice";

interface IStatusOptions {
  key: string;
  value: string;
  text: string;
}
export const TravelPlanStatusFilter = () => {
  const [statuses, setStatuses] = useState<IStatusOptions[]>([
    { key: "-1", value: "-1", text: "All" },
  ]);
  const dispatch = useAppDispatch();

  function handleOnChange(e: any, data: any) {
    const enumNum = parseInt(data.value);
    if (typeof TravelPlanStatusEnum[enumNum] === "undefined") {
      toast.error("Please select valid status filter");
    } else {
      dispatch(loadUserTravelPlansAsync(enumNum));
    }
  }

  function handleSearchOnChange(e: any, data: any) {
    console.log(data.value);
    dispatch(filterTravelPlans(data.value));
  }

  useEffect(() => {
    TravelPlanService.statuses().then((stats) => {
      const options: IStatusOptions[] = statuses;
      stats.forEach((s) => {
        const option: IStatusOptions = {
          key: s.uniqStatus.toString(),
          value: s.uniqStatus.toString(),
          text: s.description,
        };

        options.push(option);
      });
      setStatuses(options);
    });
  }, [statuses]);

  return (
    <Fragment>
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Select
            defaultValue="-1"
            onChange={handleOnChange}
            placeholder="All"
            options={statuses!}
          />
        </Grid.Column>
        <Grid.Column width={11}>
          <Search
            onSearchChange={handleSearchOnChange}
            input={{ fluid: true }}
            showNoResults={false}
          />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};
