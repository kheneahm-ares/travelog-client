import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/agent";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

export const loadTravelPlan = createAsyncThunk(
    'detail/loadTravelPlan',
    async (id: string, thunkAPI) =>
    {
        const travelPlan = APIServices.TravelPlanService.details(id);
        return travelPlan;

    }
)

interface IDetailSliceState
{
    travelPlan: ITravelPlan | null;
    isLoading: boolean;
}

const initialState: IDetailSliceState = {
    travelPlan: null,
    isLoading: false
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
            }
        }
    }
)

export default detailSlice.reducer;