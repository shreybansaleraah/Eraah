import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Person from "../../../assets/person.png";
import defaultImg from "../../../assets/backg.jpg";
import CustomPieChart from "../../../components/CustomPieChart";
import { calculateOverallAttendancePercentage } from "../../../components/attendanceCalculator";
function StudentDetail() {
  const { selectedChild, loading } = useSelector((state) => state.selectedUser);
  useEffect(() => {
    console.log(selectedChild);
  }, [selectedChild]);

  const overallAttendancePercentage = calculateOverallAttendancePercentage(
    selectedChild.attendance || []
  );
  const overallAbsentPercentage = 100 - overallAttendancePercentage;
  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];
  return loading ? (
    <div className="m-auto d-flex justify-content-center">loading ....</div>
  ) : (
    <div>
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
                <p>{selectedChild?.name || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Father's Name</span>
                <p>{selectedChild?.fatherName || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Mother's Name</span>
                <p>{selectedChild?.motherName || ""}</p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="">
                <span className="text-secondary">Class</span>
                <p>{selectedChild?.sclassName?.sclassName || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Father's Occupation</span>
                <p>{selectedChild?.fatherOcc || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Mother's Occupation</span>
                <p>{selectedChild?.motherOcc || ""}</p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
              <div className="">
                <span className="text-secondary">Roll</span>
                <p>{selectedChild?.rollNum || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">School</span>
                <p>{selectedChild?.school?.schoolName || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Class Teacher</span>
                <p>{selectedChild?.classTeacher?.name || ""}</p>
              </div>
            </div>
          </div>
        </div>

        {
          (selectedChild.attendance || []) &&
            Array.isArray(selectedChild.attendance || []) &&
            (selectedChild.attendance || []).length > 0 && (
              <div className="left-panel my-4">
                <div className="second-heading d-inline-flex justify-content-start align-items-center">
                  <i className="text-white bi bi-person-square"></i>
                  <img src={Person} alt="" />
                  <p className="px-3 m-0 text-white">
                    <strong>Attendence Pie Chart</strong>
                  </p>
                </div>
                <div className="row p-4 justify-content-center">
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column justify-content-center">
                    <CustomPieChart data={chartData} />
                  </div>
                </div>
              </div>
            )

          // <br />
        }
      </div>
      {/* <Button variant="contained" sx={styles.styledButton} className="show-tab" onClick={() => { setShowTab(!showTab) }}>
                    {
                        showTab
                            ? <KeyboardArrowUp />
                            : <KeyboardArrowDown />
                    }
                    Edit Student
                </Button>
                <Collapse in={showTab} timeout="auto" unmountOnExit>
                    <div className="register">
                        <form className="registerForm" onSubmit={submitHandler}>
                            <span className="registerTitle">Edit Details</span>
                            <label>Name</label>
                            <input className="registerInput" type="text" placeholder="Enter user's name..."
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                autoComplete="name" required />

                            <label>Roll Number</label>
                            <input className="registerInput" type="number" placeholder="Enter user's Roll Number..."
                                value={rollNum}
                                onChange={(event) => setRollNum(event.target.value)}
                                required />

                            <label>Password</label>
                            <input className="registerInput" type="password" placeholder="Enter user's password..."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="new-password" />

                            <button className="registerButton" type="submit" >Update</button>
                        </form>
                    </div>
                </Collapse> */}
    </div>
  );
}

export default StudentDetail;
