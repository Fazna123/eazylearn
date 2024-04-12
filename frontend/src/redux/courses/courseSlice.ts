import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCourse: null,
  courseLoading: false,
  courseError: false,
  courseSuccess: false,
};

const courseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    fetchCourseStart: (state) => {
      state.courseLoading = true;
      state.courseSuccess = false;
    },
    fetchCourseSuccess: (state, action) => {
      state.currentCourse = action.payload;
      state.courseLoading = false;
      state.courseSuccess = true;
      state.courseError = false;
    },
    fetchCourseFailure: (state, action) => {
      state.courseLoading = false;
      state.courseError = action.payload;
    },
    createCourseStart: (state) => {
      state.courseLoading = true;
      state.courseSuccess = false;
    },
    createCourseSuccess: (state) => {
      //state.currentCourse = action.payload;
      state.courseLoading = false;
      state.courseSuccess = true;
      state.courseError = false;
    },
    createCourseFailure: (state, action) => {
      state.courseLoading = false;
      state.courseError = action.payload;
    },
    updateCourseStart: (state) => {
      state.courseLoading = true;
      state.courseSuccess = false;
    },
    updateCourseSuccess: (state, action) => {
      state.currentCourse = action.payload;
      state.courseLoading = false;
      state.courseSuccess = true;
      state.courseError = false;
    },
    updateCourseFailure: (state, action) => {
      state.courseLoading = false;
      state.courseError = action.payload;
    },
    deleteCourseStart: (state) => {
      state.courseLoading = true;
      state.courseSuccess = false;
    },
    deleteCourseSuccess: (state) => {
      state.currentCourse = null;
      state.courseLoading = false;
      state.courseSuccess = true;
      state.courseError = false;
    },
    deleteCourseFailure: (state, action) => {
      state.courseLoading = false;
      state.courseError = action.payload;
    },
  },
});

export const {
  fetchCourseStart,
  fetchCourseSuccess,
  fetchCourseFailure,
  createCourseStart,
  createCourseSuccess,
  createCourseFailure,
  updateCourseStart,
  updateCourseSuccess,
  updateCourseFailure,
  deleteCourseStart,
  deleteCourseSuccess,
  deleteCourseFailure,
} = courseSlice.actions;

export default courseSlice.reducer;
