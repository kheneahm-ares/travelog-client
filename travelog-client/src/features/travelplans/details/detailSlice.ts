import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TravelPlanService } from "../../../app/api/travelog/TravelPlanService";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { history } from "../../..";
import { TravelogConstants } from "../../../app/common/constants/Constants";
import { TravelPlanStatusEnum } from "../../../app/common/enums/TravelPlanStatusEnum";
import { ITravelPlanStatus } from "../../../app/common/interfaces/ITravelPlanStatus";

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

export const setTravelPlanStatus = createAsyncThunk(
    'detail/setTravelPlanStatus',
    async ({ travelPlanId, uniqStatus }: { travelPlanId: string, uniqStatus: number }) =>
    {
        try
        {
            const response = await TravelPlanService.setStatus(travelPlanId, uniqStatus);

            return response[travelPlanId];
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
                state.deletingTravelPlan = false;
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
                //we don't want to toggle it false BC we are re-routing to dashboard
                //also if we set it to false, it would re-render the comp and cause 
                //other comps to reload which will cause errors but also unecessary
                // state.deletingTravelPlan = false;
                toast.success("Successfully deleted Travel Plan");
            },
            [deleteTravelPlan.rejected as any]: (state, action) =>
            {
                state.deletingTravelPlan = false;
            },
            [setTravelPlanStatus.pending as any]: (state) =>
            {
                state.loadingPlan = true;
            },
            [setTravelPlanStatus.fulfilled as any]: (state, action: PayloadAction<ITravelPlanStatus>) =>
            {
                state.travelPlan!.travelPlanStatus = action.payload;
                state.loadingPlan = false;
            },
            [setTravelPlanStatus.rejected as any]: (state, action) =>
            {
                state.travelPlan = null;
                state.loadingPlan = true;

                toast.error(action.error.message);
            },
        }
    }
)


//etc
export const { openModal, closeModal } = detailSlice.actions;

export default detailSlice.reducer;