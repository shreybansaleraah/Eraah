import axios from "axios";
import {
  getRequest,
  getError,
  getSuccess,
  getFailed,
  setSelectedClass,
  setSelectedNgoId,
  setSelectedTeacher,
} from "./selectedDataSlice";

export const setNgoId = (id) => async (dispatch) => {
  dispatch(setSelectedNgoId(id));
};
export const setChildId = (id) => async (dispatch) => {
  try {
    dispatch(getRequest());
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Student/${id}`
    );
    if (result.data.message) {
      // return { success: false, message: result.data.message };
      dispatch(getFailed(result.data.message));
    } else {
      console.log("success and get data : ", result.data);
      // return { success: true, data: result.data };
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    // return { success: false, message: "Check internet connection" };
    dispatch(getError(error));
  }
};
export const setTeacherId = (id) => async (dispatch) => {
  try {
    dispatch(getRequest());
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Teacher/${id}`
    );
    if (result.data.message) {
      // return { success: false, message: result.data.message };
      dispatch(getFailed(result.data.message));
    } else {
      console.log("success and get selected teacher data : ", result.data);
      // return { success: true, data: result.data };
      dispatch(setSelectedTeacher(result.data));
    }
  } catch (error) {
    // return { success: false, message: "Check internet connection" };
    dispatch(getError(error));
  }
};
export const setclass = (id) => async (dispatch) => {
  dispatch(setSelectedClass(id));
};
