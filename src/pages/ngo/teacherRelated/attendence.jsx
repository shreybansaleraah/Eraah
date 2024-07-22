import React, { useEffect, useState } from "react";
import {
  addAttendence,
  fetchTeachersForAttendance,
} from "../../../utils/api-factory";
import { useSelector } from "react-redux";
import Popup from "../../../components/Popup";

function Attendence() {
  const userState = useSelector((state) => state.user.currentUser);
  // const { currentUser } = userState;
  const [attendence, setAttendence] = useState([]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fetchTeachers = () => {
    fetchTeachersForAttendance(
      userState._id,
      (callback) => {
        setAttendence(callback.data);
        console.log(callback);
      },
      (onError) => {
        console.log(onError);
        setMessage("something went wrong");
      }
    );
  };
  const handleChange = (value, index) => {
    console.log(value);
    // console.log(index);
    const newData = [...attendence];
    // Update the status of the second item to false (index 1)
    newData[index].status = value.target.checked ? "present" : "absent";
    // Update the state with the modified array
    setAttendence(newData);
  };
  const handleSubmit = () => {
    console.log(attendence);
    addAttendence(
      userState._id,
      attendence,
      (callback) => {
        // setAttendence(callback.data);
        console.log(callback);
        setMessage("successfully submitted");
        setShowPopup(true);
      },
      (onError) => {
        console.log(onError);
        setMessage(onError?.response?.data?.message || "something went wrong");
        setShowPopup(true);
      }
    );
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <>
      <div
        className="p-2 card shadow border-0 text-center"
        style={{ height: "70vh", overflowY: "auto", backgroundColor: "white" }}
      >
        <table class="table table-bordered m-0" style={{ minWidth: "80%" }}>
          <thead>
            <tr className="table-primary">
              <th scope="col">Teacher Name</th>
              <th scope="col">Present</th>
            </tr>
          </thead>
          <tbody>
            {attendence.map((teacher, idx) => {
              return (
                <tr>
                  <td>{teacher.teacher.name}</td>
                  <td>
                    {" "}
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={teacher.status === "present" ? true : false}
                      checked={teacher.status === "present" ? true : false}
                      id="defaultCheck1"
                      onChange={(value) => handleChange(value, idx)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-center align-items-center my-2 mt-4">
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
}

export default Attendence;
