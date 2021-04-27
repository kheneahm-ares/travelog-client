import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";

//async thunks
export const loadTravelPlan = createAsyncThunk(
    'detail/loadTravelPlan',
    async (id: string) =>
    {
        const travelPlan = await TravelPlanService.details(id);
        return travelPlan;
    }
)

export const deleteTravelPlan = createAsyncThunk(
    'detail/deleteTravelPlan',
    async (id: string) =>
    {
        const response = await TravelPlanService.delete(id);
        return response;
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
    isModalOpen: false
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
            [deleteTravelPlan.pending as any]: (state) =>
            {
                state.deletingTravelPlan = true;
            },
            [deleteTravelPlan.fulfilled as any]: (state) =>
            {
                state.deletingTravelPlan = false;
            }
        }
    }
)


//etc
export const { openModal, closeModal } = detailSlice.actions;

export default detailSlice.reducer;