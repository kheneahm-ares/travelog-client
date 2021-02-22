import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Oidc from "oidc-client";
import { userManager } from "../../app/auth/AuthServices";
import { RootState } from "../../app/store";

//thunk comes out of the box with react toolkit, no need to add it as middleware
export const signInUserAsync = createAsyncThunk( 
    'auth/signingIn',
    async (thunkApi) => {
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
        console.log('ehll');
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
    reducers: {
        signIn: (state, action) =>
        {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logIn: () =>
        {
            userManager.signinRedirect();
        },
        
    },
    extraReducers: {
        [signInUserAsync.fulfilled as any]: (state, action) => {
            console.log('fullfilled');

            state.user = action.payload;
            state.isLoggedIn = true;
        }
    }
})


export const isLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const user = (state: RootState) => {
    console.log(state);
    return state.authReducer.user;
}

export const { signIn, logIn} = authSlice.actions
export default authSlice.reducer;