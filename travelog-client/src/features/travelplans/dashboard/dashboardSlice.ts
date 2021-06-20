import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { TravelPlanHelper } from "../../../app/common/helpers/TravelPlanHelper";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { RootState } from "../../../app/store";

export const loadUserTravelPlansAsync = createAsyncThunk(
    'dashboard/userTravelPlans',
    async (tpStatus: number, thunkAPI) => 
    {
        try
        {
            var travelPlans = await TravelPlanService.list(tpStatus);
            return travelPlans;
        }
        catch (err)
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
        catch (err)
        {
            //log?
            throw new Error('Error occurred loading Travel Plans');
        }
    }
)

interface IDashboardInitialState
{
    travelPlans: ITravelPlan[]; //the original travel plan registry
    filteredTravelPlans: ITravelPlan[]
    isTravelPlansLoading: boolean
}

const initialState: IDashboardInitialState =
{
    travelPlans: [],
    filteredTravelPlans: [],
    isTravelPlansLoading: true
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        filterTravelPlans: (state, action: PayloadAction<string>) =>
        {
            state.filteredTravelPlans = state.travelPlans.filter((tp) =>
            {
                return tp.name.toLowerCase().includes(action.payload)
            });
        }
    },
    extraReducers: {
        [loadUserTravelPlansAsync.pending as any]: (state) => 
        {
            state.isTravelPlansLoading = true;
        },
        [loadUserTravelPlansAsync.fulfilled as any]: (state, action: PayloadAction<ITravelPlan[]>) => 
        {
            state.travelPlans = action.payload;
            state.filteredTravelPlans = action.payload;
            state.isTravelPlansLoading = false;
        },
        [loadUserTravelPlansAsync.rejected as any]: (state, action) => 
        {
            state.travelPlans = [];
            state.filteredTravelPlans = [];
            state.isTravelPlansLoading = true;
            toast.error(action.error.message);
        }
    }
});


export const getTravelPlansByDate = () => (state: RootState) =>
{

    const groupedTravelPlansByDate = TravelPlanHelper.getTravelPlanByDate(state.dashboardReducer.filteredTravelPlans);

    return groupedTravelPlansByDate;
}

export const { filterTravelPlans } = dashboardSlice.actions;

export default dashboardSlice.reducer;
