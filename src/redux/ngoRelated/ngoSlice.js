import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ngoList: [],
  loading: false,
  error: null,
  response: null,
};

const ngoSlice = createSlice({
  name: "ngo",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },

    getSuccess: (state, action) => {
      state.ngoList = action.payload;
      state.loading = false;
      state.error = null;
    },

    getFailed: (state, action) => {
      state.ngoList = [];
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFailedTwo: (state, action) => {
      state.ngoList = [];
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getRequest, getSuccess, getFailed, getError, getFailedTwo } =
  ngoSlice.actions;

export const ngoReducer = ngoSlice.reducer;
