import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/travelog/agent";
import { IInvitation } from "../../../app/common/interfaces/IInvitation";

export const loadInvitationsAsync = createAsyncThunk(
    'invitations/loadInvitations',
    async () => {
        const invitations = await APIServices.InvitationService.list();
        return invitations;
    }
)


interface IInvitationState
{
    loading: boolean;
    invitations: IInvitation[];
}
const initialState: IInvitationState =
{
    loading: true,
    invitations: []
}
const invitationSlice = createSlice(
    {
        name: 'invitation',
        initialState: initialState,
        reducers: {

        },
        extraReducers: {
            [loadInvitationsAsync.pending as any]: (state) => 
            {
                state.loading = true;
            },
            [loadInvitationsAsync.fulfilled as any]: (state, action: PayloadAction<IInvitation[]>) => 
            {
                state.invitations = action.payload;
                state.loading = false;

            },
        }
    }
)

export default invitationSlice.reducer;