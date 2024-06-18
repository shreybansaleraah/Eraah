import axios from "axios";

export const getFacilities = (id, callback, onError) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/facilityList/${id}`)
    .then((result) => {
      if (result.data.message) {
        onError("");
      } else {
        // dispatch(getSuccess(result.data));
        callback(result.data);
      }
    })
    .catch((e) => {
      onError("something webt wrong");
    });
};
export const getAllFacilitiesOnDashboard = (id, callback, onError) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/admin/facilities/${id}`)
    .then((result) => {
      if (result.data.message) {
        onError("");
      } else {
        // dispatch(getSuccess(result.data));
        callback(result.data);
      }
    })
    .catch((e) => {
      onError("something went wrong");
    });
};
export const uploadDeployementProof = (payload, callback, onError) => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/uploadFacilityProof`, payload)
    .then((result) => {
      if (result.data.message) {
        onError("Not uploaded,try again");
      } else {
        // dispatch(getSuccess(result.data));
        callback("uploaded successfully");
      }
    })
    .catch((e) => {
      onError("something went wrong");
    });
};
export const fetchAllDonors = (callback, onError) => {
  axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/admin/getAllDonor?id=${
        JSON.parse(localStorage.getItem("user"))._id
      }`
    )
    .then((result) => {
      callback(result.data.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const deleteDonor = (id, callback, onError) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/admin/getAllDonor?id=${id}`)
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const updateDonor = (id, payload, callback, onError) => {
  axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/admin/updateDonor?id=${id}`,
      payload
    )
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const addDonor = (payload, callback, onError) => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/admin/addDonor`, payload)
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const getDonorInfo = (id, callback, onError) => {
  // conso;
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/donorInfo?id=${id}`)
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const getGalleryImages = (payload, callback, onError) => {
  // conso;
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/NGO/getGallery`, payload)
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const uploadGalleryImages = (payload, callback, onError) => {
  // conso;

  axios
    .post(`${process.env.REACT_APP_BASE_URL}/NGO/uploadPhoto`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const addBlog = (payload, callback, onError) => {
  // conso;

  axios
    .post(`${process.env.REACT_APP_BASE_URL}/blog/add`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const getBlogs = (callback, onError) => {
  // conso;

  axios
    .get(`${process.env.REACT_APP_BASE_URL}/blogs`)
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const deleteBlogById = (payload, callback, onError) => {
  // conso;

  axios
    .post(`${process.env.REACT_APP_BASE_URL}/blog/delete`, payload)
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const updateBlog = (id, payload, callback, onError) => {
  // conso;

  axios
    .post(`${process.env.REACT_APP_BASE_URL}/blog/update?id=${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const getEachBlog = (id, callback, onError) => {
  // conso;

  axios
    .get(`${process.env.REACT_APP_BASE_URL}/eachBlog?id=${id}`)
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const uploadStudentPhoto = (id, payload, callback, onError) => {
  // conso;

  axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/uploadStudentPhoto?id=${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const uploadTeacherPhoto = (id, payload, callback, onError) => {
  // conso;

  axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/uploadTeacherPhoto?id=${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
export const urlConverter = (id, payload, callback, onError) => {
  // conso;

  axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/eraahUrlConverter?id=${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((result) => {
      callback(result.data);
    })
    .catch((e) => {
      console.log(e);
      onError(e);
    });
};
