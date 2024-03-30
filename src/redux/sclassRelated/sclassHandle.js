import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  getStudentsSuccess,
  detailsSuccess,
  getFailedTwo,
  getSubjectsSuccess,
  getSubDetailsSuccess,
  getSubDetailsRequest,
} from "./sclassSlice";

export const getAllSclasses = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  console.log("getting all classes", id);

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}List/${id}`
    );
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const removeSclasse = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getClassStudents = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Sclass/Students/${id}`
    );
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getStudentsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getClassDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    if (result.data) {
      dispatch(detailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getSubjectList = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/FreeSubjectList/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getSubjectDetails = (id, address) => async (dispatch) => {
  dispatch(getSubDetailsRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    if (result.data) {
      dispatch(getSubDetailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const removeSubject = (id) => async (dispatch) => {
  dispatch(getSubDetailsRequest());

  try {
    const result = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/Subject/${id}`
    );
    if (result.data) {
      dispatch(getSubDetailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const addDataByCsv =
  (id, payload, callback, onError) => async (dispatch) => {
    // dispatch(getSubDetailsRequest());

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/NGO/uploadCsv/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.data.data != null && result.data.data === "success") {
        // dispatch(getSubDetailsSuccess(result.data));
        callback({ success: true, message: "upload Successfully" });
      } else {
        onError({ success: false, message: "try again,something went wrong" });
      }
    } catch (error) {
      onError({ success: false, message: "check internet connection" });
      // dispatch(getError(error));
    }
  };
