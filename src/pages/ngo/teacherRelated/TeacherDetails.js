import React, { useEffect } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import defaultImg from "../../../assets/backg.jpg";
import Person from "../../../assets/person.png";

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
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

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          {isSubjectNamePresent ? (
            <>
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
                        <p>{teacherDetails?.teachSclass?.sclassName || ""}</p>
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Button variant="contained" onClick={handleAddSubject}>
              Add Subject
            </Button>
          )}
        </Container>
      )}
    </>
  );
};

export default TeacherDetails;
