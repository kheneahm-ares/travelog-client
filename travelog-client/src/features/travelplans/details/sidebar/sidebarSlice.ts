import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TravelPlanService } from "../../../../app/api/travelog/TravelPlanService";


export const removeTraveler = createAsyncThunk(
    'sidebar/removeTraveler',
    async ({ username, travelPlanId }: { username: string, travelPlanId: string }) =>
    {

        try
        {
            await TravelPlanService.removeTraveler(username, travelPlanId);
            return username;
        } catch (err)
        {
            throw new Error('Error occurred removing traveler');
        }

    }
)

interface ISidebarState
{
    loading: boolean;
}

const initialState: ISidebarState = {
    loading: true,
}

const sidebarSlice = createSlice({
    name: 'planSidebar',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [removeTraveler.pending as any]: (state) =>
        {
            state.loading = true;
        },
        [removeTraveler.fulfilled as any]: (state, action) =>
        {
            state.loading = false;
        },
        [removeTraveler.rejected as any]: (state, action) =>
        {
            state.loading = false;

            toast.error(action.error.message);
        }
    }
});



export default sidebarSlice.reducer;