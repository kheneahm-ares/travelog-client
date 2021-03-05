import { Action, createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { exception } from "console";
import moment from "moment";
import { APIServices } from "../../../app/api/agent";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { RootState } from "../../../app/store";

//async thunks
export const loadTravelPlan = createAsyncThunk(
    'detail/loadTravelPlan',
    async (id: string, thunkAPI) =>
    {
        const travelPlan = await APIServices.TravelPlanService.details(id);
        return travelPlan;
    }
)

export const deleteTravelPlan = createAsyncThunk(
    'detail/deleteTravelPlan',
    async (id: string, thunkAPI) =>
    {
        const response = await APIServices.TravelPlanService.delete(id);
        return response;
    }
)

interface IDetailSliceState
{
    travelPlan: ITravelPlan | null;
    loadingPlan: boolean;
    deletingTravelPlan: boolean;
}

const initialState: IDetailSliceState = {
    travelPlan: null,
    loadingPlan: true,
    deletingTravelPlan: false,
}

//slice
const detailSlice = createSlice(
    {
        name: 'details',
        initialState: initialState,
        reducers: {
        },
        extraReducers: {
            [loadTravelPlan.pending as any]: (state) =>
            {
                state.loadingPlan = true;
            },
            [loadTravelPlan.fulfilled as any]: (state, action: PayloadAction<ITravelPlan>) =>
            {
                state.travelPlan = action.payload;
                state.loadingPlan = false;
            },
            [deleteTravelPlan.pending as any]: (state) =>
            {
                state.deletingTravelPlan = true;
            },
            [deleteTravelPlan.fulfilled as any]: (state) =>
            {
                state.deletingTravelPlan = false;
            }
        }
    }
)


//etc

export default detailSlice.reducer;