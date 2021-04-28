import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { AuthService } from "../../../app/auth/AuthServices";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";


export const loadTravelPlan = createAsyncThunk(
    'manage/loadTravelPlan',
    async (id: string, thunkAPI) =>
    {
        try
        {
            const travelPlan = await TravelPlanService.details(id);
            return travelPlan;
        } catch (err)
        {
            throw new Error('Error occurred loading travel plan');

        }
    }
)

export const submitTravelPlanEdit = createAsyncThunk(
    'manage/editTravelPlan',
    async (travelPlanForm: ITravelPlan) =>
    {
        try
        {
            var editedTravelPlan = await TravelPlanService.update(travelPlanForm);
            return editedTravelPlan;
        } catch (err)
        {
            throw new Error('Error occurred editing travel plan');
        }
    }
)

export const createTravelPlan = createAsyncThunk(
    'manage/createTravelPlan',
    async (travelPlanForm: ITravelPlan) =>
    {
        try
        {
            const oidcUser = await AuthService.getOidcUser();
            travelPlanForm.createdById = oidcUser?.profile.sub!;
            var newTravelPlan = await TravelPlanService.create(travelPlanForm);
            return newTravelPlan;
        } catch (err)
        {
            throw new Error('Error occurred creating travel plan');

        }
    }
)

interface IManageSlaceState
{
    travelPlan: ITravelPlan | null;
    isLoading: boolean;
    isSubmitting: boolean;
}

const initialState: IManageSlaceState = {
    travelPlan: null,
    isLoading: false,
    isSubmitting: false,
}

const manage = createSlice({
    name: 'manage',
    initialState: initialState,
    reducers: {
        resetState: (state) =>
        {
            state.travelPlan = null;
            state.isLoading = false;
            state.isSubmitting = false;
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
        [loadTravelPlan.rejected as any]: (state, action) =>
        {
            state.isLoading = true;
            toast.error(action.error.message);
        },
        [submitTravelPlanEdit.pending as any]: (state) =>
        {
            state.isSubmitting = true;
        },
        [submitTravelPlanEdit.fulfilled as any]: (state, action: PayloadAction<ITravelPlan>) =>
        {
            state.travelPlan = action.payload;
            state.isSubmitting = false;
        },
        [submitTravelPlanEdit.rejected as any]: (state, action) =>
        {
            state.isSubmitting = false;
        },
        [createTravelPlan.pending as any]: (state) =>
        {
            state.isSubmitting = true;
        },
        [createTravelPlan.fulfilled as any]: (state, action: PayloadAction<ITravelPlan>) =>
        {
            state.travelPlan = action.payload;
            state.isSubmitting = false;
        },
        [createTravelPlan.rejected as any]: (state, action) =>
        {
            state.isSubmitting = false;
        },
    }
})

export const { resetState } = manage.actions;

export default manage.reducer;