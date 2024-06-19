import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Person from "../../../assets/person.png";
import defaultImg from "../../../assets/backg.jpg";
import { Container } from "@mui/material";
function TeacherDetail() {
  const { selectedTeacher, loading } = useSelector(
    (state) => state.selectedUser
  );
  useEffect(() => {
    console.log("selectedTeacher", selectedTeacher);
  }, [selectedTeacher]);

  return loading ? (
    <div className="m-auto d-flex justify-content-center">loading ....</div>
  ) : (
    <Container>
      <div style={{ position: "relative" }}>
        <div className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto mt-4">
          <div className="col-lg-4 col-md-6 col-sm-10 col-4 rounded m-auto d-flex justify-content-center">
            <img
              src={
                selectedTeacher?.photoUrl ||
                "https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              // src={defaultImg}
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
                  <p>{selectedTeacher?.name || ""}</p>
                </div>
                <div className="">
                  <span className="text-secondary">Email</span>
                  <p>{selectedTeacher?.email || ""}</p>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                <div className="">
                  <span className="text-secondary">Class</span>
                  {selectedTeacher?.teachSclass != null && (
                    <p>
                      {selectedTeacher?.teachSclass?.map((item) => {
                        return <span>{item.sclassName},</span>;
                      })}
                    </p>
                  )}
                </div>
                <div className="">
                  <span className="text-secondary">Pan</span>
                  <p>{selectedTeacher?.pan || ""}</p>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                <div className="">
                  <span className="text-secondary">Subject</span>
                  {selectedTeacher?.teachSubject != null && (
                    <p>
                      {selectedTeacher?.teachSubject?.map(
                        (subjectData, idx) => {
                          return (
                            <span>
                              {subjectData.subName}
                              {idx === selectedTeacher.teachSubject.length - 1
                                ? ""
                                : ", "}
                            </span>
                          );
                        }
                      )}
                    </p>
                  )}
                </div>
                <div className="">
                  <span className="text-secondary">Class Teacher</span>
                  <p>{selectedTeacher?.classTeacher || ""}</p>
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
              {selectedTeacher != null &&
                selectedTeacher.studentsList?.length && (
                  <>
                    {selectedTeacher.studentsList.map((item) => {
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
      </div>
    </Container>
  );
}

export default TeacherDetail;
