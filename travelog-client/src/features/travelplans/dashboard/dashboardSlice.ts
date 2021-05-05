import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { TravelPlanStatusEnum } from "../../../app/common/enums/TravelPlanStatusEnum";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

export const loadUserTravelPlansAsync = createAsyncThunk(
    'dashboard/userTravelPlans',
    async (tpStatus: number, thunkAPI) => 
    {
        try
        {
            var travelPlans = await TravelPlanService.list(tpStatus);
            return travelPlans;
        }
        catch(err)
        {
            //log?
            throw new Error('Error occurred loading Travel Plans');
        }
    }
)

export const loadTravelPlanStatusesAsync = createAsyncThunk(
    'dashboard/travelPlanStatuses',
    async (args, thunkAPI) => 
    {
        try
        {
            var tpStatuses = await TravelPlanService.statuses();
            return tpStatuses;
        }
        catch(err)
        {
            //log?
            throw new Error('Error occurred loading Travel Plans');
        }
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
        [loadUserTravelPlansAsync.rejected as any]: (state, action) => 
        {
            state.travelPlans = [];
            state.isTravelPlansLoading = true;
            toast.error(action.error.message);
        }
    }
});

export default dashboardSlice.reducer;
