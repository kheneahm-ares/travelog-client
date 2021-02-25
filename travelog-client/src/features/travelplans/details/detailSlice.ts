import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/agent";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";

export const loadTravelPlan = createAsyncThunk(
    'detail/loadTravelPlan',
    async (id: string, thunkAPI) =>
    {
        const travelPlan = await APIServices.TravelPlanService.details(id);
        console.log(travelPlan);
        return travelPlan;

    }
)
export const loadTravelPlanActivities = createAsyncThunk(
    'detail/loadActivities',
    async (id: string, thunkAPI) =>
    {
        const activities = await APIServices.TravelPlanActivityService.list(id);
        return activities;

    }
)

interface IDetailSliceState
{
    travelPlan: ITravelPlan | null;
    travelPlanActivities: ITravelPlanActivity[] | null;
    isLoading: boolean;
    isLoadingActivities: boolean;
}

const initialState: IDetailSliceState = {
    travelPlan: null,
    isLoading: true,
    travelPlanActivities: null,
    isLoadingActivities: true
}

const detailSlice = createSlice(
    {
        name: 'details',
        initialState: initialState,
        reducers: {

        },
        extraReducers: {
            [loadTravelPlan.pending as any]: (state) =>
            {
                state.isLoading = true;
            },
            [loadTravelPlan.fulfilled as any]: (state, action: PayloadAction<ITravelPlan>) =>
            {
                state.travelPlan = action.payload;
                state.isLoading = false;
            },
            [loadTravelPlanActivities.pending as any]: (state) =>
            {
                state.isLoadingActivities = true;
            },
            [loadTravelPlanActivities.fulfilled as any]: (state, action: PayloadAction<ITravelPlanActivity[]>) =>
            {
                state.travelPlanActivities = action.payload;
                state.isLoadingActivities = false;
            }
        }
    }
)

export default detailSlice.reducer;