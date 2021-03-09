import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/travelog/agent";
import { AuthService } from "../../../app/auth/AuthServices";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";


export const loadTravelPlan = createAsyncThunk(
    'manage/loadTravelPlan',
    async (id: string, thunkAPI) =>
    {
        const travelPlan = await APIServices.TravelPlanService.details(id);
        return travelPlan;
    }
)

export const submitTravelPlanEdit = createAsyncThunk(
    'manage/editTravelPlan',
    async (travelPlanForm: ITravelPlan) =>
    {
        var editedTravelPlan = await APIServices.TravelPlanService.update(travelPlanForm);
        return editedTravelPlan;
    }
)

export const createTravelPlan = createAsyncThunk(
    'manage/createTravelPlan',
    async (travelPlanForm: ITravelPlan) =>
    {
        const oidcUser = await AuthService.getOidcUser();
        travelPlanForm.createdById = oidcUser?.profile.sub!;
        var newTravelPlan = await APIServices.TravelPlanService.create(travelPlanForm);
        return newTravelPlan;
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
    isSubmitting: false
}

const manage = createSlice({
    name: 'manage',
    initialState: initialState,
    reducers: {
        resetState: (state) => {
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
        [submitTravelPlanEdit.pending as any]: (state) =>
        {
            state.isSubmitting = true;
        },
        [submitTravelPlanEdit.fulfilled as any]: (state, action: PayloadAction<ITravelPlan>) =>
        {
            state.travelPlan = action.payload;
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
    }
})

export const {resetState} = manage.actions; 

export default manage.reducer;