import { cleanup } from "@testing-library/react";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Header,
  Item,
  Label,
  Pagination,
  Segment,
} from "semantic-ui-react";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { useAppDispatch } from "../../../app/customHooks";
import { centerMap } from "./mapSlice";

interface IProps {
  travelPlanActivities: ITravelPlanActivity[];
  mapActivities: Map<string, ITravelPlanActivity>;
}

export const MapSidebar: React.FC<IProps> = ({
  travelPlanActivities,
  mapActivities,
}) => {
  const dispatch = useAppDispatch();
  const LIMIT = 5;
  const TOTAL_PAGES = Math.ceil(travelPlanActivities.length / LIMIT);
  const [pagActivities, setPagActivities] = useState(travelPlanActivities.slice(0, LIMIT));

  function handleOnClick(id: string, e: any) {
    const clickedActivity = mapActivities.get(id);
    const activityLoc = clickedActivity?.location;

    dispatch(
      centerMap({ lat: activityLoc?.latitude, lng: activityLoc?.longitude })
    );
  }

  //react batches state changes that occur in event handlers and lifecycle methods
  //so the state changes below won't end up in multiple re-renders
  function handlePageChange(e: any, { activePage }: any) {
    const start = (activePage - 1) * LIMIT;
    const end = start + LIMIT;
    const newPagActs = travelPlanActivities.slice(start, end);
    setPagActivities(newPagActs);

    if(newPagActs != null || newPagActs!.length > 0)
    {
      const firstAct = newPagActs[0];
      dispatch(
        centerMap({ lat: firstAct.location.latitude, lng: firstAct.location.longitude })
      );

    }
  }

  return (
    <Fragment>
      <Pagination
            totalPages={TOTAL_PAGES}
            siblingRange={0}
            boundaryRange={0}
            onPageChange={handlePageChange}
          />
      <Segment.Group>
        {pagActivities!.map((a) => (
          <Segment
            onClick={handleOnClick.bind(this, a.id)}
            key={a.id}
            className="map-segment"
          >
            <h3>{a.name}</h3>
            <label>{a.location.address}</label>
          </Segment>
        ))}
      </Segment.Group>
    </Fragment>
  );
};
