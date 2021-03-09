import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { APIServices } from "../../../../app/api/travelog/agent";
import { ActivityHelper } from "../../../../app/common/helpers/ActivityHelper";
import { ITravelPlanActivity } from "../../../../app/common/interfaces/ITravelPlanActivity";
import { RootState } from "../../../../app/store";

export const loadTravelPlanActivities = createAsyncThunk(
    'detail/loadActivities',
    async (id: string, thunkAPI) =>
    {
        const activities = await APIServices.TravelPlanActivityService.list(id);
        return activities;
    }
)

// export const loadTravelPlanDispatch = (id: string): ThunkAction<void, RootState, null, Action<string>> =>
//     async (dispatch): Promise<void> =>
//     {
//         console.log()
//         dispatch(loadTravelPlanActivities(id));
//     }

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

interface IActivitySliceState
{
    travelPlanActivities: ITravelPlanActivity[];
    loadingActivities: boolean;
    selectedActivity: ITravelPlanActivity | null;
    isModalOpen: boolean;
    deletingActivity: boolean;
    activityTarget: string;
    formSubmitting: boolean;
}
const initialState: IActivitySliceState = {
    travelPlanActivities: [],
    loadingActivities: true,
    selectedActivity: null,
    isModalOpen: false,
    deletingActivity: false,
    formSubmitting: false,
    activityTarget: "",
}

const activitySlice = createSlice({
    name: 'activity',
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
        },
    },
    extraReducers:
    {
        [loadTravelPlanActivities.pending as any]: (state) =>
        {
            state.loadingActivities = true;
        },
        [loadTravelPlanActivities.fulfilled as any]: (state, action: PayloadAction<ITravelPlanActivity[]>) =>
        {
            state.travelPlanActivities = action.payload;
            state.loadingActivities = false;
        },
        [submitActivityEdit.pending as any]: (state, action) =>
        {
            state.formSubmitting = true;
        },
        [submitActivityEdit.fulfilled as any]: (state, action) =>
        {
            state.formSubmitting = false;
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
        [createActivity.pending as any]: (state, action) => 
        {
            state.formSubmitting = true;
        },
        [createActivity.fulfilled as any]: (state, action) => 
        {
            state.formSubmitting = false;
            state.isModalOpen = false;
        }
    }
})

//selectors
export const getActivitiesByDate = () => (state: RootState) =>
{
    //no need to sort, API returns sorted activities via sql

    //we need to group activities by the property, in our case we are defaulting to date initially
    const mapGroupedActivities = ActivityHelper.getActivitiesByDate(state.activityReducer.travelPlanActivities);

    return mapGroupedActivities;
}
export const { closeModal, openModal} = activitySlice.actions;

export default activitySlice.reducer;