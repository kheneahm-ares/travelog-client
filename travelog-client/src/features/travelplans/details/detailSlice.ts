import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/agent";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { RootState } from "../../../app/store";

export const loadTravelPlan = createAsyncThunk(
    'detail/loadTravelPlan',
    async (id: string, thunkAPI) =>
    {
        const travelPlan = await APIServices.TravelPlanService.details(id);
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

export const submitActivityEdit = createAsyncThunk(
    'detail/editActivity',
    async(formActivity: ITravelPlanActivity, thunkAPI) =>
    {
        //in terms of dates, we expect the dates are already switched from locale to ISO strings
        await APIServices.TravelPlanActivityService.update(formActivity);
    }
)

interface IDetailSliceState
{
    travelPlan: ITravelPlan | null;
    travelPlanActivities: ITravelPlanActivity[];
    isLoading: boolean;
    isLoadingActivities: boolean;
    selectedActivity: ITravelPlanActivity | null;
    isModalOpen: boolean;
}

const initialState: IDetailSliceState = {
    travelPlan: null,
    isLoading: true,
    travelPlanActivities: [],
    isLoadingActivities: true,
    selectedActivity: null,
    isModalOpen: false
}

const detailSlice = createSlice(
    {
        name: 'details',
        initialState: initialState,
        reducers: {
            openModal: (state, action) => {
                state.selectedActivity = action.payload;
                state.isModalOpen = true;
            },
            closeModal: (state) => {
                state.selectedActivity = null;
                state.isModalOpen = false;
            }
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
            },
            [submitActivityEdit.fulfilled as any]: (state, action) =>
            {
                state.isModalOpen = false;
            }
        }
    }
)

export const getActivitiesByGroup = (propToGroupBy: string) => (state: RootState) => {
    //we need to group activities by the property, in our case we are defaulting to date initially
    const mapGroupedActivities = new Map<string, ITravelPlanActivity[]>();

    state.detailReducer.travelPlanActivities?.forEach((a) => {
        const formattedDate = a.startTime.split('T')[0];

        //key exists with array of activities, add to array
        if(mapGroupedActivities.has(formattedDate))
        {
            var currentActivities = mapGroupedActivities.get(formattedDate);
            currentActivities?.push(a); //no need to readd to map since array is ref type
        }
        else
        {
            mapGroupedActivities.set(formattedDate, [a])
        }
        
    });

    return mapGroupedActivities;
    
} 

export const {closeModal, openModal} = detailSlice.actions;

export default detailSlice.reducer;