import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    async (formActivity: ITravelPlanActivity, thunkAPI) =>
    {
        const editedActivity = await APIServices.TravelPlanActivityService.update(formActivity);
        //always return so that the promise resolves expectedly
        return editedActivity;
    }
)

export const deleteActivity = createAsyncThunk(
    'detail/deleteActivity',
    async (activityId: string, thunkAPI) =>
    {
        const responseStatus = await APIServices.TravelPlanActivityService.delete(activityId);
        if (responseStatus === 200)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
)

export const createActivity = createAsyncThunk(
    'detail/createActivity',
    async (newActivity: ITravelPlanActivity, thunkAPI) =>
    {
        const createdActivity = await APIServices.TravelPlanActivityService.create(newActivity);
        return createdActivity;
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
    deletingActivity: boolean;
    activityTarget: string;
    formLoading: boolean;
    deletingTravelPlan: boolean;
}

const initialState: IDetailSliceState = {
    travelPlan: null,
    isLoading: true,
    travelPlanActivities: [],
    isLoadingActivities: true,
    selectedActivity: null,
    isModalOpen: false,
    deletingActivity: false,
    formLoading: false,
    activityTarget: "",
    deletingTravelPlan: false,
}


//slice
const detailSlice = createSlice(
    {
        name: 'details',
        initialState: initialState,
        reducers: {
            openModal: (state, action) =>
            {
                state.selectedActivity = action.payload;
                state.isModalOpen = true;
            },
            closeModal: (state) =>
            {
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
            [deleteTravelPlan.pending as any]: (state) => {
                state.deletingTravelPlan = true;
            },
            [deleteTravelPlan.fulfilled as any]: (state) => {
                state.deletingTravelPlan = false;
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
            [submitActivityEdit.pending as any]: (state, action) =>
            {
                state.formLoading = true;
            },
            [submitActivityEdit.fulfilled as any]: (state, action) =>
            {
                state.formLoading = false;
                state.selectedActivity = null;
                state.isModalOpen = false;
            },
            [deleteActivity.pending as any]: (state, action) =>
            {
                state.deletingActivity = true;
                state.activityTarget = action.meta.arg;
            },
            [deleteActivity.fulfilled as any]: (state, action) =>
            {
                state.deletingActivity = false;
                state.selectedActivity = null;
                state.isModalOpen = false;
            },
            [createActivity.pending as any] : (state, action) => 
            {
                state.formLoading = true;
            },
            [createActivity.fulfilled as any] : (state, action) => 
            {
                state.formLoading = false;
                state.isModalOpen = false;
            }
        }
    }
)

//selectors
export const getActivitiesByDate = () => (state: RootState) =>
{
    //no need to sort, API returns sorted activities via sql

    //we need to group activities by the property, in our case we are defaulting to date initially
    const mapGroupedActivities = new Map<string, ITravelPlanActivity[]>();

    state.detailReducer.travelPlanActivities?.forEach((a) =>
    {
        //need to localized date
        //ex: 03/01 1AM GMT will be 02/28 date in central
        const localizedDate = new Date(a.startTime);
        const formattedDate = moment(localizedDate).format('yyyy-MM-DD');

        //key exists with array of activities, add to array
        if (mapGroupedActivities.has(formattedDate))
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

//etc
export const { closeModal, openModal } = detailSlice.actions;

export default detailSlice.reducer;