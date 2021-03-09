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

  function handleOnMouseOver(e: any) {
    e.target.style.backgroundColor = "lightGray";
  }
  function handleOnMouseLeave(e: any) {
    e.target.style.backgroundColor = "";
  }

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
            onMouseLeave={handleOnMouseLeave}
            onMouseOver={handleOnMouseOver}
            onClick={handleOnClick.bind(this, a.id)}
            key={a.id}
          >
            <Header
              onMouseLeave={handleOnMouseLeave}
              onMouseOver={handleOnMouseOver}
            >
              {a.name}
            </Header>
            <Label
              onMouseLeave={handleOnMouseLeave}
              onMouseOver={handleOnMouseOver}
            >
              {a.location.address}
            </Label>
          </Segment>
        ))
      )}
    </Segment.Group>
  );
};
