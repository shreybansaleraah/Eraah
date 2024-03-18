import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import Popup from "../../../components/Popup";
import { registerUser } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { CircularProgress } from "@mui/material";

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const { status, response, error } = useSelector((state) => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [photo, setPhoto] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass =
    subjectDetails &&
    subjectDetails.sclassName &&
    subjectDetails.sclassName._id;

  const fields = {
    name,
    email,
    password,
    aadhar,
    pan,
    photo,
    role,
    school,
    teachSubject,
    teachSclass,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate("/ngo/teachers");
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
    <div
      className="my-4"
      style={{ paddingTop: "6.5rem", paddingBottom: "2rem" }}
    >
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Teacher</span>
          <br />
          <label>Subject : {subjectDetails && subjectDetails.subName}</label>
          <label>
            Class :{" "}
            {subjectDetails &&
              subjectDetails.sclassName &&
              subjectDetails.sclassName.sclassName}
          </label>
          <label>Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />
          <label>Aadhar</label>
          <input
            className="registerInput"
            type="number"
            placeholder="Enter teacher's Aadhar..."
            value={aadhar}
            onChange={(event) => setAadhar(event.target.value)}
            autoComplete="new-password"
            maxLength={12}
          />
          <label>Pan</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter teacher's Pan..."
            value={pan}
            onChange={(event) => setPan(event.target.value.toUpperCase())}
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
          />
          <label>Photo</label>
          <input
            className="registerInput"
            type="file"
            placeholder="upload file here..."
            onChange={(event) => setPhoto(event.target.files[0])}
            required
          />

          <button
            className="registerButton my-2"
            type="submit"
            disabled={loader}
          >
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default AddTeacher;
