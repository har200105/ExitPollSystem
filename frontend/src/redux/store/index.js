import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userReducer from "";

const store = configureStore({
    reducer: {
      user:userReducer
    },
});

export default store;
