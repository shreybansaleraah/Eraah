import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { CircularProgress } from "@mui/material";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherOcc, setMotherOcc] = useState("");
  const [fatherOcc, setFatherOcc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");

  const NGOID = currentUser._id;
  const role = "Student";
  const attendance = [];

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getAllSclasses(NGOID, "Sclass"));
  }, [NGOID, dispatch]);

  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class");
      setSclassName("");
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  const fields = {
    name,
    rollNum,
    fatherName,
    motherName,
    motherOcc,
    fatherOcc,
    photo,
    sclassName,
    NGOID,
    role,
    attendance,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === "") {
      setMessage("Please select a classname");
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div
        className="register my-4"
        style={{ paddingTop: "12rem", paddingBottom: "2rem" }}
      >
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Student</span>
          <label>Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          {situation === "Student" && (
            <>
              <label>Class</label>
              <select
                className="registerInput"
                value={className}
                onChange={changeHandler}
                required
              >
                <option value="Select Class">Select Class</option>
                {sclassesList.map((classItem, index) => (
                  <option key={index} value={classItem.sclassName}>
                    {classItem.sclassName}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>Roll Number</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's Roll Number..."
            value={rollNum}
            onChange={(event) => setRollNum(event.target.value)}
            required
          />

          <label>Mother's Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's mother's name..."
            value={motherName}
            onChange={(event) => setMotherName(event.target.value)}
            autoComplete="new-password"
            required
          />
          <label>Mother's Occupation</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's mother's occupation"
            value={motherOcc}
            onChange={(event) => setMotherOcc(event.target.value)}
            autoComplete="new-password"
            required
          />
          <label>Father's Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's father's name..."
            value={fatherName}
            onChange={(event) => setFatherName(event.target.value)}
            autoComplete="new-password"
            required
          />
          <label>Father's Occupation</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's father's occupation"
            value={fatherOcc}
            onChange={(event) => setFatherOcc(event.target.value)}
            autoComplete="new-password"
            required
          />
          <label>Student Photo</label>
          <input
            className="registerInput"
            type="file"
            placeholder="Upload Photo"
            onChange={(event) => setPhoto(event.target.files[0])}
            required
          />

          <button
            className="registerButton my-2"
            type="submit"
            disabled={loader}
          >
            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
          </button>
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddStudent;
