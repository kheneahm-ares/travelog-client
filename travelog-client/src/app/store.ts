import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/travelplans/dashboard/dashboardSlice';
import detailReducer from '../features/travelplans/details/detailSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

  
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['dashboardReducer', 'detailReducer']
};

const rootReducer = combineReducers({authReducer, dashboardReducer, detailReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer)
  
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
})

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const configures = () => ({
    store, 
    persistor
})
export default configures