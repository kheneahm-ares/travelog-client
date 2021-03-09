import React, { useState } from "react";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import {
  GoogleApiWrapper,
  IProvidedProps,
  Map as GoogleMap,
  Marker,
} from "google-maps-react";
import { ILocation } from "../../../app/common/interfaces/ILocation";
import { centerMap } from "./mapSlice";
import { useAppSelector } from "../../../app/customHooks";
import { RootState } from "../../../app/store";

interface IProps extends IProvidedProps {
  groupedActivities: Map<string, ITravelPlanActivity[]>;
}
export const MapView: React.FC<IProps> = ({ groupedActivities, google }) => {
  const defaultCenterLoc: ILocation = groupedActivities.values().next().value[0]
    .location;
  const initialCenter = {
    lat: parseFloat(defaultCenterLoc.latitude),
    lng: parseFloat(defaultCenterLoc.longitude),
  };

  const { mapCenter } = useAppSelector((state: RootState) => state.mapReducer);

  return (
    <GoogleMap google={google} zoom={5} initialCenter={initialCenter} center={mapCenter}>
      {Array.from(groupedActivities).map(([key, activities]) => {
        return activities.map((a) => (
          <Marker
            title={"The marker`s title will appear as a tooltip."}
            position={{
              lat: parseFloat(a.location.latitude),
              lng: parseFloat(a.location.longitude),
            }}
          />
        ));
      })}
    </GoogleMap>
  );
};

export default GoogleApiWrapper((opts) => ({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
}))(MapView);
