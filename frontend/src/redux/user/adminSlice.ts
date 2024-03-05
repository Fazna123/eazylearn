import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    adminSigninStart: (state) => {
      state.loading = true;
    },
    adminSigninSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = false;
    },
    adminSigninFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAdminStart: (state) => {
      state.loading = true;
    },
    updateAdminSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAdminStart: (state) => {
      state.loading = true;
    },
    deleteAdminSuccess: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = false;
    },
    deleteAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  adminSigninStart,
  adminSigninSuccess,
  adminSigninFailure,
  updateAdminFailure,
  updateAdminStart,
  updateAdminSuccess,
  deleteAdminFailure,
  deleteAdminStart,
  deleteAdminSuccess,
  signOut,
} = adminSlice.actions;

export default adminSlice.reducer;
