import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadUserService, loginService, registerService } from "../services/user";

const initialState = {
    user:null,
    isAuthenticated: false,  
    loading: false,
    error: null,
    message: null,
    success:false
};

export const loginUser = createAsyncThunk("auth/login", async(loginData) => {
    const response = await loginService(loginData);
    if (response?.error) {
        return { error: response?.error };
    }
    return response;
});


export const signupUser = createAsyncThunk("auth/signup", async (signupData) => {
    const response = await registerService(signupData);
    if (response?.error) {
        return { error: response?.error };
    }
    return response;
});

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
    const response = await loadUserService();
    if (response?.error) {
        return { error: response?.error };
    }
    return response;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
         reset: (state, action) => {
            state.error = null;
            state.message = null;
            state.success = false;
            state.loading = false;
        },
        logout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                localStorage.setItem("token", action.payload?.token);
                state.user = action.payload.user;
                state.isAuthenticated = true;
            } else {
                state.error = action.payload?.error;
                state.message = action.payload?.message;
            }
        },
        [loadUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                state.user = action.payload?.user;
                state.isAuthenticated = true;
            }
        }
        
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;