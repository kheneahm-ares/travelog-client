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

export const deleteAnnouncement = createAsyncThunk(
    'announcement/delete',
    async ({ announcementID }: { announcementID: string }) =>
    {

        try
        {
            await TPAnnouncementService.delete(announcementID);
        }
        catch (err)
        {
            throw new Error("Error occurred loading announcements");
        }
    })

export const submitAnnouncementEdit = createAsyncThunk(
    'announcement/edit',
    async ({ announcement }: { announcement: ITPAnnouncement }) =>
    {

        try
        {
            const updatedAnnouncement = await TPAnnouncementService.edit(announcement);
            return updatedAnnouncement;
        }
        catch (err)
        {
            throw new Error("Error occurred updating announcement");
        }
    })

export const submitAnnouncementCreate = createAsyncThunk(
    'announcement/create',
    async ({ announcement }: { announcement: ITPAnnouncement }) =>
    {

        try
        {
            const updatedAnnouncement = await TPAnnouncementService.create(announcement);
            return updatedAnnouncement;
        }
        catch (err)
        {
            throw new Error("Error occurred creating announcement");
        }
    })
interface IAnnouncementState
{
    announcementTargetID: string | null;
    showForm: boolean;
    loading: boolean;
    formSubmitting: boolean;
    announcements: ITPAnnouncement[];
}

const initialState: IAnnouncementState =
{
    announcementTargetID: null,
    showForm: false,
    loading: false,
    announcements: [],
    formSubmitting: false
}

const announcementSlice = createSlice({
    name: 'tpAnnouncement',
    initialState: initialState,
    reducers: {
        manageFormShow: (state, action: PayloadAction<{ showForm: boolean, announcementTargetID: string | null }>) => 
        {
            state.showForm = action.payload.showForm;
            state.announcementTargetID = action.payload.announcementTargetID;
        }

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
        },
        [submitAnnouncementEdit.pending as any]: (state) =>
        {
            state.formSubmitting = true;
        },
        [submitAnnouncementEdit.fulfilled as any]: (state) =>
        {
            state.formSubmitting = false;
            state.announcementTargetID = null;
            state.showForm = false;

            toast.success("Successfully Updated Announcement");
        },
        [submitAnnouncementEdit.rejected as any]: (state, action) =>
        {
            state.formSubmitting = false;

            toast.error(action.error.message);
        },
        [submitAnnouncementCreate.pending as any]: (state) =>
        {
            state.formSubmitting = true;
        },
        [submitAnnouncementCreate.fulfilled as any]: (state) =>
        {
            state.formSubmitting = false;
            state.announcementTargetID = null;
            state.showForm = false;

            toast.success("Successfully Created Announcement");
        },
        [submitAnnouncementCreate.rejected as any]: (state, action) =>
        {
            state.formSubmitting = false;

            toast.error(action.error.message);
        },
        [deleteAnnouncement.pending as any]: (state) =>
        {
            state.loading = true;
        },
        [deleteAnnouncement.fulfilled as any]: (state) =>
        {
            state.loading = false;

            toast.success("Successfully Deleted Announcement");
        },
        [deleteAnnouncement.rejected as any]: (state, action) =>
        {
            state.loading = false;

            toast.error(action.error.message);
        }
    }
});

export const getAnnouncementsByDate = () => (state: RootState) =>
{

    const announcements = AnnouncementHelper.getAnnouncementsByDate(state.announcementReducer.announcements);
    return announcements;
}

export const { manageFormShow } = announcementSlice.actions;

export default announcementSlice.reducer;