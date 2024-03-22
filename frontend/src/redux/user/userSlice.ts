import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userLoading: false,
  userError: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.userLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.userLoading = false;
      state.userError = false;
    },
    signInFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    updateUserStart: (state) => {
      state.userLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.userLoading = false;
      state.userError = false;
    },
    updateUserFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    deleteUserStart: (state) => {
      state.userLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.userLoading = false;
      state.userError = false;
    },
    deleteUserFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.userLoading = false;
      state.userError = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
