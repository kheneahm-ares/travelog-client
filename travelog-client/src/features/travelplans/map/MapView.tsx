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
  travelPlanActivities: ITravelPlanActivity[];
}
export const MapView: React.FC<IProps> = ({ travelPlanActivities, google }) => {
  const defaultCenterLoc: ILocation = travelPlanActivities[0].location;
  const initialCenter = {
    lat: defaultCenterLoc.latitude,
    lng: defaultCenterLoc.longitude,
  };

  const { mapCenter } = useAppSelector((state: RootState) => state.mapReducer);

  return (
    <GoogleMap
      google={google}
      zoom={5}
      initialCenter={initialCenter}
      center={mapCenter}
    >
      {travelPlanActivities.map((a) => (
        <Marker
          key={a.id}
          title={"The marker`s title will appear as a tooltip."}
          position={{
            lat: a.location.latitude,
            lng: a.location.longitude,
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleApiWrapper((opts) => ({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
}))(MapView);
