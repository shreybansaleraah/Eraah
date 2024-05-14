import React, { useEffect, useState } from "react";
import {
  getTeacherDetails,
  makeTeacherHead,
} from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import defaultImg from "../../../assets/backg.jpg";
import Person from "../../../assets/person.png";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { sclassesList } = useSelector((state) => state.sclass);
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response } = userState;

  const teacherID = params.id;

  const [className, setClassName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [dispatch, teacherID]);

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
              <div className="col-lg-4 col-md-6 col-sm-10 col-4 rounded m-auto d-flex justify-content-center">
                <img
                  src={defaultImg}
                  alt=""
                  style={{
                    width: "22vw",
                    height: "22vw",
                    borderRadius: "50%",
                  }}
                />
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
                          {teacherDetails?.teachSclass?.map((item) => {
                            return <span>{item.sclassName},</span>;
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
                      <p>{teacherDetails?.teachSubject?.subName || ""}</p>
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
                <div className="second-heading d-inline-flex justify-content-start align-items-center">
                  <i className="text-white bi bi-person-square"></i>
                  <img src={Person} alt="" />
                  <p className="px-3 m-0 text-white">
                    <strong>Students</strong>
                  </p>
                </div>
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
                                    width: "14rem",
                                    borderRadius: "50%",
                                    margin: "auto",
                                  }}
                                >
                                  <img
                                    src="https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    class="card-img-top"
                                    alt="..."
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
              </div>
            </div>

            {teacherDetails?.classTeacher === "NO" && (
              <div style={{ position: "absolute", top: "0rem", right: "1rem" }}>
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
              </div>
            )}
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
          </div>
        </Container>
      )}
    </>
  );
};

export default TeacherDetails;
