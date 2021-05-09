import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/travelplans/dashboard/dashboardSlice';
import detailReducer from '../features/travelplans/details/detailSlice';
import manageReducer from '../features/travelplans/manage/manageSlice';
import activityReducer from '../features/travelplans/details/activities/activitySlice';
import mapReducer from '../features/travelplans/map/mapSlice';
import invitationReducer from '../features/profile/invitations/InvitationSlice';
import sidebarReducer from '../features/travelplans/details/sidebar/sidebarSlice';
import announcementReducer from '../features/travelplans/details/announcements/announcementSlice';

const rootReducer = combineReducers({
  authReducer, dashboardReducer, detailReducer,
  manageReducer, activityReducer, mapReducer, invitationReducer, sidebarReducer,
  announcementReducer
});

const store = configureStore({
  reducer: rootReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const configures = () => ({
  store
})
export default configures