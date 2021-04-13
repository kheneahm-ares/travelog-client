import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../app/auth/AuthServices";
import { IUser } from "../../app/common/interfaces/IUser";
import { RootState } from "../../app/store";

//thunk comes out of the box with react toolkit, no need to add it as middleware
export const signInUserAsync = createAsyncThunk(
    'auth/signIn',
    async (args, thunkAPI) =>
    {
        const appUser = await AuthService.signInUserCallback();
        return appUser;
    }
)

export const signInSilentAsync = createAsyncThunk(
    'auth/signInSilent',
    async (args, thunkAPI) =>
    {
        const appUser = await AuthService.signInSilentCallback();
        return appUser;
    }
)

export const signOutRedirectAsync = createAsyncThunk(
    'auth/signOutRedirect',
    async (args, thunkAPI) =>
    {
        await AuthService.signOut();
        return true;
    }
)
interface IAuthInitialState
{
    isLoggedIn: boolean;
    user: IUser | null;
    loading: boolean;
    isUserAuthenticated: boolean;
}
const initialState: IAuthInitialState =
{
    isLoggedIn: false,
    user: null,
    loading: false,
    isUserAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    //case reducers, key names automagically generate actions via the toolkit
    reducers: {
        signOutUser: (state) =>
        {
            state.user = null;
            state.isLoggedIn = false;
            state.isUserAuthenticated = false;
        }
    },
    extraReducers: {
        [signInUserAsync.pending as any]: (state, action) =>
        {
            state.loading = true;
        },
        [signInUserAsync.fulfilled as any]: (state, action) =>
        {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
            state.isUserAuthenticated = true;
        },
        [signInSilentAsync.pending as any]: (state, action) =>
        {
            state.loading = true;
        },
        [signInSilentAsync.fulfilled as any]: (state, action) =>
        {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
            state.isUserAuthenticated = true;
        },
        [signOutRedirectAsync.pending as any]: (state) =>
        {
            state.loading = true;
        },
        [signOutRedirectAsync.fulfilled as any]: (state) =>
        {
            state.loading = false;

        },
    }
})


export const IsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const getUser = (state: RootState) =>
{
    return state.authReducer.user;
}

export const { signOutUser } = authSlice.actions;
export default authSlice.reducer;