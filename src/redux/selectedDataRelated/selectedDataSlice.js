import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNgoId: "",
  selectedClass: "",
  selectedChild: {},
  selectedTeacher: {},
  loading: false,
  error: null,
  response: null,
};

const selectedDataSlice = createSlice({
  name: "selectedData",
  initialState,
  reducers: {
    setSelectedNgoId: (state, action) => {
      state.selectedNgoId = action.payload;
    },
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    setSelectedChild: (state, action) => {
      state.selectedChild = action.payload;
    },
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getRequest: (state) => {
      state.loading = true;
    },

    getSuccess: (state, action) => {
      state.selectedChild = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedNgoId,
  setSelectedChild,
  setSelectedClass,
  setSelectedTeacher,
  getRequest,
  getSuccess,
  getError,
  getFailed,
} = selectedDataSlice.actions;

export const selectedDataReducer = selectedDataSlice.reducer;
