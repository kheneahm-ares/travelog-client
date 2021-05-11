import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { TPAnnouncementService } from "../../../../app/api/travelog/TPAnnouncementService";
import { AnnouncementHelper } from "../../../../app/common/helpers/AnnouncementHelper";
import { ITPAnnouncement } from "../../../../app/common/interfaces/ITPAnnouncement";
import { ITPAnnouncementEnvelope } from "../../../../app/common/interfaces/ITPAnnouncementEnvelope";
import { RootState } from "../../../../app/store";


export const loadAnnouncements = createAsyncThunk(
    'announcement/list',
    async ({ travelPlanID, limit, offset }: { travelPlanID: string, limit: number, offset: number }) =>
    {

        try
        {
            const announcementEnv = await TPAnnouncementService.list(travelPlanID, limit, offset);
            return announcementEnv;
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
    announcementCount: number;
    limit: 5;
    offset: number;
}

const initialState: IAnnouncementState =
{
    announcementTargetID: null,
    showForm: false,
    loading: false,
    announcements: [],
    formSubmitting: false,
    announcementCount: 0,
    offset: 0,
    limit: 5
}

const announcementSlice = createSlice({
    name: 'tpAnnouncement',
    initialState: initialState,
    reducers: {
        manageFormShow: (state, action: PayloadAction<{ showForm: boolean, announcementTargetID: string | null }>) => 
        {
            state.showForm = action.payload.showForm;
            state.announcementTargetID = action.payload.announcementTargetID;
        },
        managePageChange: (state, action: PayloadAction<number>) =>
        {
            state.offset = (action.payload - 1) * state.limit;;
        }

    },
    extraReducers: {
        [loadAnnouncements.pending as any]: (state) =>
        {
            state.loading = true;
        },
        [loadAnnouncements.fulfilled as any]: (state, action: PayloadAction<ITPAnnouncementEnvelope>) =>
        {
            state.announcements = action.payload.announcementDtos;
            state.announcementCount = action.payload.announcementCount;
            state.loading = false
        },
        [loadAnnouncements.rejected as any]: (state, action) =>
        {
            state.loading = false;
            state.announcements = [];
            state.announcementCount = 0;

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

export const { manageFormShow, managePageChange } = announcementSlice.actions;

export default announcementSlice.reducer;