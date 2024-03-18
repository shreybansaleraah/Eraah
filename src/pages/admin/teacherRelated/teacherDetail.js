import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Person from "../../../assets/person.png";
import defaultImg from "../../../assets/backg.jpg";
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
    <div className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto">
      <div className="col-lg-4 col-md-6 col-sm-10 col-4 rounded m-auto d-flex justify-content-center">
        <img
          src={defaultImg}
          alt=""
          style={{ width: "22vw", height: "22vw", borderRadius: "50%" }}
        />
      </div>
      <div className="left-panel my-4">
        <div className="second-heading d-inline-flex justify-content-start align-items-center">
          <i className="text-white bi bi-person-square"></i>
          <img src={Person} alt="" />
          <p className="px-3 m-0 text-white">
            <strong>Basic Details</strong>
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
              <p>{selectedTeacher?.teachSclass?.sclassName || ""}</p>
            </div>
            <div className="">
              <span className="text-secondary">Pan</span>
              <p>{selectedTeacher?.pan || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Subject</span>
              <p>{selectedTeacher?.teachSubject?.subName || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
