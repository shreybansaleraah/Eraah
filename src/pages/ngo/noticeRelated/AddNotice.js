import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { CircularProgress } from "@mui/material";
import Popup from "../../../components/Popup";

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const NGOID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, time, description, entryFee, date, NGOID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/ngo/notices");
      dispatch(underControl());
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div
        className="register py-4"
        style={{ marginTop: "6.5rem", marginBottom: "2rem" }}
      >
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Notice</span>
          <label>Title</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <label>Time</label>
          {/* <input
            className="registerInput"
            type="text"
            placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          /> */}
          <input
            className="registerInput"
            type="time"
            placeholder="Select time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            className="registerInput"
            type="text"
            rows={5}
            placeholder="Enter notice details..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <label>Entry Fee</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice title..."
            value={entryFee}
            onChange={(event) => setEntryFee(event.target.value)}
            required
          />

          <label>Date</label>
          <input
            className="registerInput"
            type="date"
            placeholder="Enter notice date..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <button
            className="registerButton mb-4"
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

export default AddNotice;
