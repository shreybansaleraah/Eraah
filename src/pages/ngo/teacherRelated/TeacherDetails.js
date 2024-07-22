import React, { useEffect, useState, useRef } from "react";
import {
  getTeacherDetails,
  makeTeacherHead,
} from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Modal, Typography } from "@mui/material";
import defaultImg from "../../../assets/backg.jpg";
import Person from "../../../assets/person.png";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Popup from "../../../components/Popup";
import {
  getGalleryImages,
  uploadGalleryImages,
  uploadTeacherPhoto,
} from "../../../utils/api-factory";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ReactApexChart from "react-apexcharts";

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teacherDetails, error } = useSelector((state) => state.teacher);

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response } = userState;

  const teacherID = params.id;

  const [className, setClassName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showAttendenceChart, setShowAttendenceChart] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [attendenceOptions, setAttendenceOptions] = useState({
    series: [0, 0],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Present", "Absent"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const [showAddition, setShowAddition] = useState(false);
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      console.log(file);
      uploadTeacherPhoto(
        teacherID,
        formData,
        (callback) => {
          if (callback.error) {
            setMessage(callback.message ?? "something went wrong");
            setShowPopup(true);
          } else {
            dispatch(getTeacherDetails(teacherID));
            setMessage("upload successfully");
            setShowPopup(true);
          }
        },
        (onError) => {
          setMessage(onError.response.data.message ?? "something went wrong");
          setShowPopup(true);
        }
      );
    }
  };
  const fetchData = () => {
    var payload = {
      ngoId: currentUser._id,
      teacherId: teacherID,
    };
    getGalleryImages(
      payload,
      (callback) => {
        console.log(callback);
        setGallery(callback.data);
      },
      (onError) => {
        console.log(onError);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmition = () => {
    console.log("photo");
    console.log(photo);
    if (photo && photo.type.includes("image/")) {
      setLoading(true);
      var payload = {
        ngoId: currentUser._id,
        teacherId: teacherID,
        img: photo,
      };
      uploadGalleryImages(
        payload,
        (callback) => {
          setLoading(false);
          setMessage(callback.message);
          setShowAddition(false);
          setShowPopup(true);
        },
        (onError) => {
          setLoading(false);
          setMessage(onError.response.data.message);
          // setShowAddition(false);
          setShowPopup(true);
        }
      );
      // console.log(photo);
    } else {
      setMessage("Please select image");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [dispatch, teacherID]);

  useEffect(() => {
    if (teacherDetails?.attendance?.totalCount) {
      setAttendenceOptions({
        ...attendenceOptions,
        series: [
          teacherDetails?.attendance?.presentCount,
          teacherDetails?.attendance?.absentCount,
        ],
      });
    } else {
      setAttendenceOptions({
        ...attendenceOptions,
        series: [0, 0, 100],
        options: {
          ...attendenceOptions,
          labels: ["Present", "Absent", "Not started"],
        },
      });
    }
  }, [teacherDetails]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/ngo/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };
  const handleMakeCTeacher = () => {
    if (className !== "Select Class") {
      var payload = {
        id: teacherID,
        teachSclass: className,
      };
      dispatch(
        makeTeacherHead(payload, (callback) => {
          if (callback) {
            dispatch(getTeacherDetails(teacherID));
          }
        })
      );
      // dispatch(getTeacherDetails(teacherID));
      setShowModal(false);
    }
  };
  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class");
      // setSclassName("");
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      // setSclassName(selectedClass._id);
    }
  };

  return (
    <>
      {!teacherDetails?.name ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <div style={{ position: "relative" }}>
            <div className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto mt-4">
              <div
                className="col-lg-4 col-md-6 col-sm-10 col-4 rounded m-auto d-flex justify-content-center"
                onClick={handleDivClick}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={
                      teacherDetails.photoUrl ||
                      "https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    // src={defaultImg}
                    alt=""
                    style={{
                      width: "18vw",
                      height: "18vw",
                      borderRadius: "50%",
                    }}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -1,
                      right: "20%",
                      padding: "0.2rem",
                      backgroundColor: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      color: "#FFFFFF",
                    }}
                  >
                    <EditIcon />
                  </div>
                </div>
              </div>
              <div className="left-panel my-4">
                <div className="second-heading d-inline-flex justify-content-start align-items-center">
                  <i className="text-white bi bi-person-square"></i>
                  <img src={Person} alt="" />
                  <p className="px-3 m-0 text-white">
                    <strong>Teacher Details</strong>
                  </p>
                </div>
                <div className="row p-4">
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column justify-content-around">
                    <div className="">
                      <span className="text-secondary">Name</span>
                      <p>{teacherDetails?.name || ""}</p>
                    </div>
                    <div className="">
                      <span className="text-secondary">Email</span>
                      <p>{teacherDetails?.email || ""}</p>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="">
                      <span className="text-secondary">Class</span>
                      {teacherDetails?.teachSclass != null && (
                        <p>
                          {teacherDetails?.teachSclass?.map((item, idx) => {
                            return (
                              <span>
                                {item.sclassName}
                                {idx === teacherDetails.teachSclass.length - 1
                                  ? ""
                                  : ","}
                              </span>
                            );
                          })}
                        </p>
                      )}
                    </div>
                    <div className="">
                      <span className="text-secondary">Pan</span>
                      <p>{teacherDetails?.pan || ""}</p>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="">
                      <span className="text-secondary">Subject</span>
                      {/* <p>{teacherDetails?.teachSubject?.subName || ""}</p> */}
                      {teacherDetails?.teachSubject != null && (
                        <p>
                          {teacherDetails?.teachSubject?.map((item, idx) => {
                            return (
                              <span>
                                {item.subName}
                                {idx === teacherDetails.teachSubject.length - 1
                                  ? ""
                                  : ", "}
                              </span>
                            );
                          })}
                        </p>
                      )}
                    </div>
                    <div className="">
                      <span className="text-secondary">Class Teacher</span>
                      <p>{teacherDetails?.classTeacher || ""}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto mt-4">
              <div className="left-panel my-4">
                <div
                  className="second-heading d-inline-flex justify-content-between align-items-center"
                  onClick={() => setShowStudents(!showStudents)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-inline-flex justify-content-start align-items-center">
                    <i className="text-white bi bi-person-square"></i>
                    <img src={Person} alt="" />
                    <p className="px-3 m-0 text-white">
                      <strong>Students</strong>
                    </p>
                  </div>
                  {showStudents ? (
                    <KeyboardArrowDownIcon sx={{ color: "#FFFFFF" }} />
                  ) : (
                    <KeyboardArrowRightIcon sx={{ color: "#FFFFFF" }} />
                  )}
                </div>
                {showStudents && (
                  <div className="row justify-content-between flex-wrap p-4">
                    {teacherDetails != null &&
                      teacherDetails.studentsList?.length && (
                        <>
                          {teacherDetails.studentsList.map((item) => {
                            return (
                              <div className="col-lg-4 col-12 col-md-6 col-sm-12">
                                <div class="card" style={{ width: "14rem" }}>
                                  <div
                                    style={{
                                      width: "13.9rem",
                                      borderRadius: "50%",
                                      // margin: "auto",
                                      objectFit: "cover",
                                      // height: "7rem",
                                    }}
                                  >
                                    <img
                                      src={
                                        item.photoUrl ||
                                        "https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                      }
                                      // src="https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                      class="card-img-top"
                                      alt="..."
                                      style={{ width: "100%", height: "8rem" }}
                                    />
                                  </div>

                                  <div class="card-body">
                                    <h5 class="card-title">{item.name}</h5>
                                    <p class="card-text mb-0">
                                      Class :{" "}
                                      <span>
                                        {item?.sclassName?.sclassName || ""}
                                      </span>
                                    </p>
                                    <p class="card-text mt-0">
                                      Roll : <span>{item?.rollNum || ""}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto mt-4">
              <div className="left-panel my-4">
                <div
                  className="second-heading d-inline-flex justify-content-between align-items-center"
                  onClick={() => setShowGallery(!showGallery)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-inline-flex justify-content-start align-items-center">
                    <i className="text-white bi bi-person-square"></i>
                    <img src={Person} alt="" />
                    <p className="px-3 m-0 text-white">
                      <strong>Gallery</strong>
                    </p>
                  </div>
                  {showGallery ? (
                    <KeyboardArrowDownIcon sx={{ color: "#FFFFFF" }} />
                  ) : (
                    <KeyboardArrowRightIcon sx={{ color: "#FFFFFF" }} />
                  )}
                </div>
                {showGallery && (
                  <div className="row justify-content-between flex-wrap p-4">
                    {/* {gallery != null && gallery.length && ( */}
                    <>
                      {gallery.map((item) => {
                        return (
                          <div className="col-lg-4 col-12 col-md-6 col-sm-12">
                            <div class="card" style={{ width: "14rem" }}>
                              <div
                                style={{
                                  width: "14rem",
                                  height: "14rem",
                                  borderRadius: "50%",
                                  margin: "auto",
                                }}
                              >
                                <img
                                  src={item.picUrl}
                                  // src="https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                  class="card-img-top"
                                  alt="..."
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                    {/* )} */}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto mt-4">
              <div className="left-panel my-4">
                <div
                  className="second-heading d-inline-flex justify-content-between align-items-center"
                  onClick={() => setShowAttendenceChart(!showAttendenceChart)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-inline-flex justify-content-start align-items-center">
                    <i className="text-white bi bi-person-square"></i>
                    <img src={Person} alt="" />
                    <p className="px-3 m-0 text-white">
                      <strong>Attendence</strong>
                    </p>
                  </div>
                  {showAttendenceChart ? (
                    <KeyboardArrowDownIcon sx={{ color: "#FFFFFF" }} />
                  ) : (
                    <KeyboardArrowRightIcon sx={{ color: "#FFFFFF" }} />
                  )}
                </div>
                {showAttendenceChart && (
                  <div className="d-flex justify-content-center align-items">
                    <div id="chart">
                      <ReactApexChart
                        options={attendenceOptions.options}
                        series={attendenceOptions.series}
                        type="pie"
                        width={380}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ position: "absolute", top: "0rem", right: "1rem" }}>
              {teacherDetails?.classTeacher === "NO" && (
                <button
                  type="button"
                  // id="showModalBtn"
                  class="btn btn-outline-primary"
                  // data-bs-toggle="modal"
                  // data-bs-target="#classTeacher"
                  onClick={() => setShowModal(true)}
                >
                  Make Class Teacher
                </button>
              )}
              <button
                type="button"
                className="btn btn-outline-success mx-2"
                onClick={() => setShowAddition(true)}
              >
                Add Photo
              </button>
            </div>
            {showModal && (
              <div
                className="modal"
                tabIndex="-1"
                role="dialog"
                style={{
                  display: "block",
                  zIndex: "999999999999999999999999999",
                }}
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="loginModalLabel">
                        Make Class Teacher
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        onClick={() => setShowModal(false)}
                        aria-label="Close"
                      ></button>
                    </div>
                    <form>
                      <div class="modal-body">
                        <>
                          <label>Class</label>
                          <select
                            className="registerInput"
                            value={className}
                            onChange={changeHandler}
                            required
                          >
                            {sclassesList != null && sclassesList.length && (
                              <>
                                <option value="Select Class">
                                  Select Class
                                </option>
                                {sclassesList.map((classItem, index) => (
                                  <option
                                    key={index}
                                    value={classItem.sclassName}
                                  >
                                    {classItem.sclassName}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>
                        </>

                        <div class="form-floating my-3">
                          <button
                            class="btn btn-primary"
                            type="button"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              handleMakeCTeacher();
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      <div class="modal-footer mb-3">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            <Modal
              open={showAddition}
              onClose={() => {}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div
                style={{
                  width: "100%",
                  height: "99.8vh",
                  background: "transparent",
                  overflowY: "scroll",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <div
                  className="p-4 rounded shadow pt-2"
                  style={{
                    width: "60%",
                    margin: "auto",
                    backgroundColor: "white",
                    overflowY: "auto",
                  }}
                >
                  <div
                    className="d-flex justify-content-end"
                    onClick={() => setShowAddition(false)}
                    style={{ cursor: "pointer" }}
                  >
                    <CloseIcon />
                    {/* X */}
                  </div>
                  <div className="w-50">
                    <label for="formFileLg" class="form-label">
                      upload an image
                    </label>
                    <input
                      class="form-control form-control-lg"
                      id="formFileLg"
                      accept="image/*"
                      type="file"
                      placeholder="Upload Photo"
                      onChange={(event) => setPhoto(event.target.files[0])}
                      required
                    />
                  </div>
                  <div className="d-flex mt-4">
                    <button
                      type="button"
                      class="btn btn-outline-primary"
                      onClick={() => handleSubmition()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </Container>
      )}
    </>
  );
};

export default TeacherDetails;
