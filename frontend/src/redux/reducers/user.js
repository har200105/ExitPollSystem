import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loadUserService, loginService, registerService } from "../services/user";

const initialState = {
    user:null,
    isAuthenticated: false, 
    isAdmin:false,
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
            state.isAdmin = false;
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: {
        [signupUser.pending]: (state, action) => {
            state.loading = true;
        },
        [signupUser.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                console.log("success dd !! ss");
                state.loading = false;
                state.success = true;
            } else {
                state.loading = false;
                state.error = action.payload?.error;
            }
        },

        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                console.log("success");
                state.loading = false;
                localStorage.setItem("token", action.payload?.token);
                state.user = action.payload.user;
                state.success = true;
                state.isAuthenticated = true;
                if (action.payload?.user?.role === "admin") {
                    state.isAdmin = true;
                }
            } else {
                state.loading = false;
                state.error = action.payload?.error;
            }
        },
        [loadUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            if (action.payload?.success) {
                state.loading = false;
                state.user = action.payload?.user;
                state.isAuthenticated = true;
                if (action.payload?.user?.role === "admin") {
                    state.loading = false;
                    state.isAdmin = true;
                }
            }
        }
        
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;