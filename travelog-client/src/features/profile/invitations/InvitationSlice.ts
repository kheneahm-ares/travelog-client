import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIServices } from "../../../app/api/travelog/agent";
import { ManageInviteEnum } from "../../../app/common/enums/ManageInvEnum";
import { IInvitation } from "../../../app/common/interfaces/IInvitation";

export const loadInvitationsAsync = createAsyncThunk(
    'invitations/loadInvitations',
    async () => {
        const invitations = await APIServices.InvitationService.list();
        return invitations;
    }
)

export const manageInvite = createAsyncThunk(
    'invitations/manage',
    async ({inviteId, type}: {inviteId: number, type: ManageInviteEnum}) => {
        if(type === ManageInviteEnum.Accept)
        {
            await APIServices.InvitationService.accept(inviteId);

        }
        else if(type === ManageInviteEnum.Decline)
        {
            await APIServices.InvitationService.decline(inviteId);
        }
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
            [manageInvite.pending as any]: (state) => 
            {
                state.loading = true;
            },
            [manageInvite.fulfilled as any]: (state) => 
            {
                state.loading = false;
            },
        }
    }
)

export default invitationSlice.reducer;