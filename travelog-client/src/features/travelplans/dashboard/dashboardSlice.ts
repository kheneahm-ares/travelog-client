import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/travelog/agent";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

export const loadUserTravelPlansAsync = createAsyncThunk(
    'dashboard/userTravelPlans',
    async (args, thunkAPI) => 
    {
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
        [loadUserTravelPlansAsync.pending as any]: (state) => 
        {
            state.isTravelPlansLoading = true;
        },
        [loadUserTravelPlansAsync.fulfilled as any]: (state, action: PayloadAction<ITravelPlan[]>) => 
        {
            state.travelPlans = action.payload;
            state.isTravelPlansLoading = false;
        },
    }
});

export default dashboardSlice.reducer;
