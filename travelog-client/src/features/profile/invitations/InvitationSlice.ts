import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { InvitationService } from "../../../app/api/travelog/InvitationService";
import { ManageInviteEnum } from "../../../app/common/enums/ManageInvEnum";
import { IInvitation } from "../../../app/common/interfaces/IInvitation";

export const loadInvitationsAsync = createAsyncThunk(
    'invitations/loadInvitations',
    async () =>
    {
        try
        {
            const invitations = await InvitationService.list();
            return invitations;
        } catch (err)
        {
            throw new Error('Error occurred loading invitations');

        }
    }
)

export const manageInvite = createAsyncThunk(
    'invitations/manage',
    async ({ inviteId, type }: { inviteId: number, type: ManageInviteEnum }) =>
    {
        try
        {
            if (type === ManageInviteEnum.Accept)
            {
                await InvitationService.accept(inviteId);

            }
            else if (type === ManageInviteEnum.Decline)
            {
                await InvitationService.decline(inviteId);
            }
        } catch (err)
        {
            throw new Error(`Error occurred ${type === ManageInviteEnum.Accept ? 'accepting' : 'declining'} invitation`);

        }
    }
)


interface IInvitationState
{
    loading: boolean;
    invitations: IInvitation[] | null;
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
            [loadInvitationsAsync.rejected as any]: (state, action) => 
            {
                state.loading = true;
                state.invitations = null;
                toast.error(action.error.message);
            },
            [manageInvite.pending as any]: (state) => 
            {
                state.loading = true;
            },
            [manageInvite.fulfilled as any]: (state) => 
            {
                state.loading = false;
            },
            [manageInvite.rejected as any]: (state, action) => 
            {
                state.loading = false;
                toast.error(action.error.message);
            },
        }
    }
)

export default invitationSlice.reducer;