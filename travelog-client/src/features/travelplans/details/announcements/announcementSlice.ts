import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TPAnnouncementService } from "../../../../app/api/travelog/TPAnnouncementService";
import { AnnouncementHelper } from "../../../../app/common/helpers/AnnouncementHelper";
import { ITPAnnouncement } from "../../../../app/common/interfaces/ITPAnnouncement";
import { RootState } from "../../../../app/store";


export const loadAnnouncements = createAsyncThunk(
    'announcement/list',
    async ({ travelPlanID }: { travelPlanID: string }) =>
    {

        try
        {
            const announcements = await TPAnnouncementService.list(travelPlanID);
            return announcements;
        }
        catch (err)
        {
            throw new Error("Error occurred loading announcements");
        }
    })


interface IAnnouncementState
{
    announcementTargetID: string | null;
    isEditing: boolean;
    loading: boolean;
    announcements: ITPAnnouncement[];
}

const initialState: IAnnouncementState =
{
    announcementTargetID: null,
    isEditing: false,
    loading: false,
    announcements: []
}

const announcementSlice = createSlice({
    name: 'tpAnnouncement',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [loadAnnouncements.pending as any]: (state) =>
        {
            state.loading = true;
        },
        [loadAnnouncements.fulfilled as any]: (state, action: PayloadAction<ITPAnnouncement[]>) =>
        {
            state.announcements = action.payload;
            state.loading = false
        },
        [loadAnnouncements.rejected as any]: (state, action) =>
        {
            state.loading = false;
            state.announcements = [];

            toast.error(action.error.message);
        }
    }
});

export const getAnnouncementsByDate = () => (state: RootState) => {

    const announcements = AnnouncementHelper.getAnnouncementsByDate(state.announcementReducer.announcements);
    return announcements;
}

export default announcementSlice.reducer;