import React, { SyntheticEvent } from "react";
import { Container, Header, Item, Label, Segment } from "semantic-ui-react";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { useAppDispatch } from "../../../app/customHooks";
import { centerMap } from "./mapSlice";

interface IProps {
  groupedActivities: Map<string, ITravelPlanActivity[]>;
  mapActivities: Map<string, ITravelPlanActivity>;
}

export const MapSidebar: React.FC<IProps> = ({
  groupedActivities,
  mapActivities,
}) => {
  const dispatch = useAppDispatch();

  function handleOnClick(id: string, e: any) {
    const clickedActivity = mapActivities.get(id);
    const activityLoc = clickedActivity?.location;

    dispatch(
      centerMap({ lat: activityLoc?.latitude, lng: activityLoc?.longitude })
    );
  }

  return (
    <Segment.Group>
      {Array.from(groupedActivities).map(([key, activities]) =>
        activities.map((a) => (
          <Segment
            onClick={handleOnClick.bind(this, a.id)}
            key={a.id}
            className="map-segment"
          >
            
            <h3>{a.name}</h3>
            <label>{a.location.address}</label>
          </Segment>
        ))
      )}
    </Segment.Group>
  );
};
