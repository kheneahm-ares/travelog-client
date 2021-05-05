import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Grid, Radio, Select } from "semantic-ui-react";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { TravelPlanStatusEnum } from "../../../app/common/enums/TravelPlanStatusEnum";
import { useAppDispatch } from "../../../app/customHooks";
import { loadUserTravelPlansAsync } from "./dashboardSlice";

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
  console.log('filter');

  function handleOnChange(e: any, data: any)
  {
      const enumNum = parseInt(data.value);
      if(typeof TravelPlanStatusEnum[enumNum] === 'undefined')
      {
        toast.error("Please select valid status filter");
      }
      else
      {
        dispatch(loadUserTravelPlansAsync(enumNum));
      }
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
      <Grid columns={5}>
        <Select defaultValue="-1" onChange={handleOnChange} placeholder="All" options={statuses!} />
      </Grid>
    </Fragment>
  );
};
