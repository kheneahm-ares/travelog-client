import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TravelPlanActivityService } from "../../../../app/api/travelog/TravelPlanActivityService";
import { ActivityHelper } from "../../../../app/common/helpers/ActivityHelper";
import { ITravelPlanActivity } from "../../../../app/common/interfaces/ITravelPlanActivity";
import { RootState } from "../../../../app/store";

export const loadTravelPlanActivities = createAsyncThunk(
    'detail/loadActivities',
    async (id: string, thunkAPI) =>
    {
        try
        {
            const activities = await TravelPlanActivityService.list(id);
            return activities;
        }
        catch (err)
        {
            throw new Error('Error occurred loading activities');
        }
    }
)

export const submitActivityEdit = createAsyncThunk(
    'detail/editActivity',
    async (formActivity: ITravelPlanActivity, thunkAPI) =>
    {
        try
        {
            const editedActivity = await TravelPlanActivityService.update(formActivity);

            return editedActivity;
        } catch (err)
        {
            throw new Error('Error occurred deleting activity');

        }
    }
)

export const deleteActivity = createAsyncThunk(
    'detail/deleteActivity',
    async (activityId: string, thunkAPI) =>
    {
        try
        {
            await TravelPlanActivityService.delete(activityId);
        }
        catch (err)
        {
            throw new Error('Error occurred deleting activity');
        }
    }
)

export const createActivity = createAsyncThunk(
    'detail/createActivity',
    async (newActivity: ITravelPlanActivity, thunkAPI) =>
    {
        try
        {
            const createdActivity = await TravelPlanActivityService.create(newActivity);
            return createdActivity;
        } catch (err)
        {
            throw new Error('Error occurred creating activity');
        }
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
        [loadTravelPlanActivities.rejected as any]: (state, action) =>
        {
            state.travelPlanActivities = [];
            state.loadingActivities = false;

            toast.error(action.error.message);
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
        [submitActivityEdit.rejected as any]: (state, action) =>
        {
            state.formSubmitting = false;

            toast.error(action.error.message);

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
        [deleteActivity.rejected as any]: (state, action) =>
        {
            state.deletingActivity = false;

            toast.error(action.error.message);
        },
        [createActivity.pending as any]: (state, action) => 
        {
            state.formSubmitting = true;
        },
        [createActivity.fulfilled as any]: (state, action) => 
        {
            state.formSubmitting = false;
            state.isModalOpen = false;
        },
        [createActivity.rejected as any]: (state, action) => 
        {
            state.formSubmitting = false;

            toast.error(action.error.message);

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
export const { closeModal, openModal } = activitySlice.actions;

export default activitySlice.reducer;