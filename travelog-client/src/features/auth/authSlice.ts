import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Oidc from "oidc-client";
import { userManager } from "../../app/auth/AuthServices";
import { AppDispatch, RootState } from "../../app/store";

//thunk comes out of the box with react toolkit, no need to add it as middleware
export const signInUserAsync = createAsyncThunk( 
    'auth/signIn',
    async (args, thunkAPI) => {
        const userManager = new Oidc.UserManager(
            {
                userStore: new Oidc.WebStorageStateStore({store: window.localStorage}),
                response_mode: "query" // look for code in query
            }
        );
        const user = await userManager.signinCallback();
        const appUser: IUser = {
            userName: user.profile.name!,
            token: user.access_token
        }
        return appUser;
    } 
)


interface IUser {
    userName: string,
    token: string
}
interface IAuthInitialState{
    isLoggedIn: boolean,
    user: IUser | null
} 
const initialState: IAuthInitialState =
{
    isLoggedIn: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    //case reducers, key names automagically generate actions via the toolkit
    reducers: {
        logIn: () =>
        {
            userManager.signinRedirect();
        }
    },
    extraReducers: {
        [signInUserAsync.fulfilled as any]: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        }
    }
})


export const IsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const getUser = (state: RootState) => {
    return state.authReducer.user;
}

export const {logIn} = authSlice.actions
export default authSlice.reducer;