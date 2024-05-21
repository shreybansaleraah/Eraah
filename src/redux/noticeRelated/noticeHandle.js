import axios from "axios";
import { getRequest, getSuccess, getFailed, getError } from "./noticeSlice";

export const getAllNotices = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const getAllNoticesOnDashboard = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/notices/${id}`
    );
    if (result.data.message) {
      // onError(result.data.message);
      dispatch(getFailed(result.data.message));
    } else {
      console.log(result.data);
      // callback(result.data);
      dispatch(getSuccess(result.data.data));
    }
  } catch (error) {
    //   onError("Something went wrong");
    dispatch(getError(error));
  }
};
