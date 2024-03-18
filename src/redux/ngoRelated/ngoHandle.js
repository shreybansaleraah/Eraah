import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  getFailedTwo,
} from "./ngoSlice.js";

export const getAllNgo = () => async (dispatch) => {
  dispatch(getRequest());
  console.log("getting all ngos");
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/allNgo`);
    if (result.data.message) {
      console.log("failed in : ", result.data.message);
      dispatch(getFailedTwo(result.data.message));
    } else {
      console.log("success in : ", result.data);
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const addNgo = (payload, callback, onError) => async (dispatch) => {
  // dispatch(getRequest());
  console.log("adding ngo with payload ", payload);
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/NGOReg`,
      payload
    );
    if (result.data.message) {
      console.log("failed in : ", result.data.message);
      // dispatch(getFailedTwo(result.data.message));
      onError(result.data.message);
    } else {
      console.log("success in : ", result.data);
      callback(true);
    }
  } catch (error) {
    onError("Something went wrong");
  }
};
export const getNgoDetails = (ngoId, callback, onError) => async () => {
  // dispatch(getRequest());
  // console.log("adding ngo with payload ", payload);
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/NGO/${ngoId}`
    );
    if (result.data.message) {
      console.log("failed in : ", result.data.message);
      // dispatch(getFailedTwo(result.data.message));
      onError(result.data.message);
    } else {
      console.log("success in : ", result.data);
      callback(result.data);
    }
  } catch (error) {
    onError("Something went wrong");
  }
};
export const removeNgo = (ngoId, callback, onError) => async (dispatch) => {
  // dispatch(getRequest());
  // console.log("adding ngo with payload ", payload);
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/removeNgo/${ngoId}`,
      {}
    );
    console.log("result is : ", result);
    console.log("result data is : ", result.data);
    if (result.data === "success") {
      console.log("success in : ", result.data);
      dispatch(getAllNgo());
      callback(result.data);
    } else {
      console.log("failed in success");
      // console.log("failed in : ", result.data.message);
      // dispatch(getFailedTwo(result.data.message));
      onError(result.data.message);
    }
  } catch (error) {
    console.log("error is : ", error);
    onError("Something went wrong");
  }
};

export const updateNgo = (payload, callback, onError) => async (dispatch) => {
  // dispatch(getRequest());
  console.log("updating ngo with payload ", payload);
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/updateNgo`,
      payload
    );
    if (result.data.message) {
      console.log("failed in : ", result.data.message);
      // dispatch(getFailedTwo(result.data.message));
      onError(result.data.message);
    } else {
      console.log("success in : ", result.data);
      dispatch(getAllNgo());
      callback(true);
    }
  } catch (error) {
    onError("Something went wrong");
  }
};
export const getAdminDashboard =
  (payload, callback, onError) => async (dispatch) => {
    // dispatch(getRequest());
    console.log("updating ngo with payload ", payload);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/adminDashboard/${payload}`
      );
      if (result.data.message) {
        console.log("failed in : ", result.data.message);
        // dispatch(getFailedTwo(result.data.message));
        onError(result.data.message);
      } else {
        console.log("success in : ", result.data);
        // dispatch(getAllNgo());
        callback(result.data);
      }
    } catch (error) {
      onError("Something went wrong");
    }
  };
