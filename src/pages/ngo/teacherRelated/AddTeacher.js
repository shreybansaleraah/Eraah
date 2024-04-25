import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import Popup from "../../../components/Popup";
import { registerUser } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { CircularProgress } from "@mui/material";
import UploadCsv from "../../../components/uploadCsv/uploadCsv";

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

  const [csvTab, setCsvTab] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [photo, setPhoto] = useState(null);
  const [classTeacher, setClassTeacher] = useState(false);

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
    classTeacher,
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
    <>
      <div
        className="col-lg-6 col-sm-12 col-md-8 col-12 m-auto"
        // style={{ paddingTop: "6.5rem", paddingBottom: "2rem" }}
      >
        <form className="registerForm mt-4" onSubmit={submitHandler}>
          <span className="registerTitle">Add Teacher</span>
          <br />
          <label>Subject : {subjectDetails && subjectDetails.subName}</label>
          <label>
            Class :{" "}
            {subjectDetails &&
              subjectDetails.sclassName &&
              subjectDetails.sclassName.sclassName}
          </label>
          <label>
            Name<span className="requireField">*</span>
          </label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          <label>
            Email<span className="requireField">*</span>
          </label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label>
            Password<span className="requireField">*</span>
          </label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />
          <label>
            Aadhar<span className="requireField">*</span>
          </label>
          <input
            className="registerInput"
            type="number"
            placeholder="Enter teacher's Aadhar..."
            value={aadhar}
            onChange={(event) => setAadhar(event.target.value)}
            autoComplete="new-password"
            maxLength={12}
          />
          <label>
            Pan<span className="requireField">*</span>
          </label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter teacher's Pan..."
            value={pan}
            onChange={(event) => setPan(event.target.value.toUpperCase())}
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
          />
          <label>
            Photo<span className="requireField">*</span>
          </label>
          <input
            className="registerInput"
            type="file"
            placeholder="upload file here..."
            onChange={(event) => setPhoto(event.target.files[0])}
            required
          />
          <div className="my-3">
            <ul class="list-group">
              <li class="list-group-item">
                <input
                  class="form-check-input me-1"
                  type="checkbox"
                  value={classTeacher}
                  onChange={setClassTeacher}
                  id="firstCheckbox"
                />
                <label class="form-check-label mx-2" for="firstCheckbox">
                  Class Teacher
                </label>
              </li>
            </ul>
          </div>
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
        {/* <div className="register">
         
        </div> */}
        <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      </div>
      {/* )} */}
    </>
  );
};

export default AddTeacher;
