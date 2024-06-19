import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;

// SELECTORS
export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
