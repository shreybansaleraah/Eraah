import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../assets/WhatsApp_Image_2024-02-10_at_11.58_1__1_-removebg-preview.png";
import axios from "axios";
import Popup from "../../../components/Popup";

function AddFacility() {
  const { currentUser } = useSelector((state) => state.user);
  // const NGOID = currentUser._id;
  const [payload, setPayload] = useState({
    name: "",
    quantity: "",
    price: "",
    NGOID: currentUser._id,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmition = async () => {
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/addFacility`, payload)
      .then((result) => {
        if (result.data.message) {
          setLoading(false);
          setMessage("Invalid data");
          setShowPopup(true);
        } else {
          setPayload({ name: "", quantity: "", price: "" });
          setMessage("added successfully");
          setLoading(false);
          setShowPopup(true);
        }
      })
      .catch((e) => {
        setMessage("Something went wrong");
        setLoading(false);
        setShowPopup(true);
      });
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: "99999999999999999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Loader} alt="Rotating Image" className="rotate" />
        </div>
      )}
      <div className="col-lg-6 col-sm-12 col-md-8 col-12 m-auto">
        <h3 style={{ textAlign: "center" }}>Add Facility</h3>
        <br />
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              onChange={handleChange}
              value={payload.name}
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Quantity
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="quantity"
              onChange={handleChange}
              value={payload.quantity}
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Price
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="price"
              onChange={handleChange}
              value={payload.price}
              required
            />
          </div>

          <button
            type="button"
            class="btn btn-primary"
            onClick={handleSubmition}
          >
            Submit
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
}

export default AddFacility;
