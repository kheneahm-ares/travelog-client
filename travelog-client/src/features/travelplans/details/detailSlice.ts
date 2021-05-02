import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { history } from "../../..";
import { TravelogConstants } from "../../../app/common/constants/Constants";

//async thunks
export const loadTravelPlan = createAsyncThunk(
    'detail/loadTravelPlan',
    async (id: string) =>
    {
        try
        {
            const travelPlan = await TravelPlanService.details(id);
            return travelPlan;
        } catch (err)
        {
            const status = err.response.status;
            if (status === 403)
            {
                throw new Error(TravelogConstants.FORBIDDEN);
            }
            else
            {
                throw new Error("Error occurred loading travel plan");
            }
        }
    }
)

export const deleteTravelPlan = createAsyncThunk(
    'detail/deleteTravelPlan',
    async (id: string) =>
    {
        try
        {
            const response = await TravelPlanService.delete(id);
            return response;
        } catch (err)
        {
            throw new Error('Error occurred deleting travel plan');

        }
    }
)

interface IDetailSliceState
{
    travelPlan: ITravelPlan | null;
    loadingPlan: boolean;
    deletingTravelPlan: boolean;
    isModalOpen: boolean;
}

const initialState: IDetailSliceState = {
    travelPlan: null,
    loadingPlan: true,
    deletingTravelPlan: false,
    isModalOpen: false,
}

//slice
const detailSlice = createSlice(
    {
        name: 'details',
        initialState: initialState,
        reducers: {
            openModal: (state) =>
            {
                state.isModalOpen = true;
            },
            closeModal: (state) =>
            {
                state.isModalOpen = false;
            },
        },
        extraReducers: {
            [loadTravelPlan.pending as any]: (state) =>
            {
                state.loadingPlan = true;
            },
            [loadTravelPlan.fulfilled as any]: (state, action: PayloadAction<ITravelPlan>) =>
            {
                state.travelPlan = action.payload;
                state.loadingPlan = false;
            },
            [loadTravelPlan.rejected as any]: (state, action) =>
            {
                state.travelPlan = null;
                state.loadingPlan = true;

                toast.error(action.error.message);
            },
            [deleteTravelPlan.pending as any]: (state) =>
            {
                state.deletingTravelPlan = true;
            },
            [deleteTravelPlan.fulfilled as any]: (state) =>
            {
                state.deletingTravelPlan = false;
            },
            [deleteTravelPlan.rejected as any]: (state, action) =>
            {
                state.deletingTravelPlan = false;
            }
        }
    }
)


//etc
export const { openModal, closeModal } = detailSlice.actions;

export default detailSlice.reducer;