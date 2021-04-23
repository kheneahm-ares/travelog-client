import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../../app/api/travelog/agent";
import { ITravelPlanTraveler } from "../../../../app/common/interfaces/ITravelPlanTraveler";


export const removeTraveler = createAsyncThunk(
    'sidebar/removeTraveler',
    async ({ username, travelPlanId }: { username: string, travelPlanId: string }) =>
    {

        await APIServices.TravelPlanService.removeTraveler(username, travelPlanId);
        return username;

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
        }
    }
});


export default sidebarSlice;