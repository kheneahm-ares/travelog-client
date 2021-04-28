import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TravelPlanActivityService } from "../../../app/api/travelog/TravelPlanActivityService";
import { ActivityHelper } from "../../../app/common/helpers/ActivityHelper";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { RootState } from "../../../app/store";

export const loadTravelPlanActivities = createAsyncThunk(
    'map/loadActivities',
    async (id: string, thunkAPI) =>
    {
        try
        {
            const activities = await TravelPlanActivityService.list(id);
            return activities;
        } catch (err)
        {
            throw new Error("Error loading activities");

        }
    }
)
interface IMapSliceState
{
    travelPlanActivities: ITravelPlanActivity[];
    loadingActivities: boolean;
    mapCenter: { lat: number, lng: number }

}
const initialState: IMapSliceState = {
    travelPlanActivities: [],
    loadingActivities: true,
    mapCenter: { lat: 0, lng: 0 }
}
const mapSlice = createSlice({
    name: 'map',
    initialState: initialState,

    reducers: {
        centerMap: (state, action) =>
        {
            state.mapCenter.lat = action.payload.lat;
            state.mapCenter.lng = action.payload.lng;
        },
        resetState: (state) => 
        {
            state.travelPlanActivities = [];
            state.loadingActivities = true;
            state.mapCenter = { lat: 0, lng: 0 };
        }
    },
    extraReducers: {
        [loadTravelPlanActivities.pending as any]: (state) =>
        {
            state.loadingActivities = true;
        },
        [loadTravelPlanActivities.fulfilled as any]: (state, action: PayloadAction<ITravelPlanActivity[]>) =>
        {
            state.travelPlanActivities = action.payload;
            state.loadingActivities = false;
        },
        [loadTravelPlanActivities.rejected as any]: (state, action) =>
        {
            state.loadingActivities = false;
        },
    }
});

//selectors
export const getActivitiesByDate = () => (state: RootState) =>
{
    //no need to sort, API returns sorted activities via sql

    //we need to group activities by the property, in our case we are defaulting to date initially
    const mapGroupedActivities = ActivityHelper.getActivitiesByDate(state.mapReducer.travelPlanActivities);

    return mapGroupedActivities;
}

export const getActivitiesMappedById = () => (state: RootState) =>
{
    const activitiesMap = new Map<string, ITravelPlanActivity>();
    state.mapReducer.travelPlanActivities.forEach((a) =>
    {
        activitiesMap.set(a.id, a);
    })

    return activitiesMap;
}
export const { centerMap, resetState } = mapSlice.actions;
export default mapSlice.reducer;