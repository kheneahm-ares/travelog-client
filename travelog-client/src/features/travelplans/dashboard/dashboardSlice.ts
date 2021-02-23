import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/agent";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

export const getUserTravelPlansAsync = createAsyncThunk(
    'dashboard/userTravelPlans',
    async (args, thunkAPI) => 
    {
        console.log("getting travel plans");
        var travelPlans = await APIServices.TravelPlanService.list();

        return travelPlans;

    }
)

interface IDashboardInitialState {
    travelPlans: ITravelPlan[]
    isTravelPlansLoading: boolean
}

const initialState: IDashboardInitialState =
{
    travelPlans: [],
    isTravelPlansLoading: true
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [getUserTravelPlansAsync.pending as any]: (state) => 
        {
            state.isTravelPlansLoading = true;
        },
        [getUserTravelPlansAsync.fulfilled as any]: (state, action: PayloadAction<ITravelPlan[]>) => 
        {
            state.travelPlans = action.payload;
            state.isTravelPlansLoading = false;
        },
    }
});

export default dashboardSlice.reducer;
