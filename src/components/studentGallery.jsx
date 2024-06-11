import React, { useEffect, useState } from "react";
import { getGalleryImages, uploadGalleryImages } from "../utils/api-factory";
import { Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Popup from "./Popup";
function StudentGallery({ studentId, ngoId }) {
  const [gallery, setGallery] = useState([]);
  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [showAddition, setShowAddition] = useState(false);
  const fetchData = () => {
    var payload = {
      ngoId: ngoId,
      studentId: studentId,
    };
    getGalleryImages(
      payload,
      (callback) => {
        console.log(callback);
        setGallery(callback.data);
      },
      (onError) => {
        console.log(onError);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmition = () => {
    console.log("photo");
    console.log(photo);
    if (photo && photo.type.includes("image/")) {
      setLoading(true);
      var payload = {
        ngoId: ngoId,
        studentId: studentId,
        img: photo,
      };
      uploadGalleryImages(
        payload,
        (callback) => {
          setLoading(false);
          setMessage(callback.message);
          setShowAddition(false);
          setShowPopup(true);
        },
        (onError) => {
          setLoading(false);
          setMessage(onError.response.data.message);
          // setShowAddition(false);
          setShowPopup(true);
        }
      );
      // console.log(photo);
    } else {
      setMessage("Please select image");
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className="d-flex mt-0" style={{ flexDirection: "row-reverse" }}>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => setShowAddition(true)}
        >
          Add
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {gallery.map((item) => {
          return (
            <>
              <div className="col-lg-4 col-12 col-md-6 col-sm-12 p-3">
                <div className="card m-2" style={{ width: "98%" }}>
                  <img
                    src={item.picUrl ?? ""}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>

      <Modal
        open={showAddition}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            width: "100%",
            height: "99.8vh",
            background: "transparent",
            overflowY: "scroll",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="p-4 rounded shadow pt-2"
            style={{
              width: "60%",
              margin: "auto",
              backgroundColor: "white",
              overflowY: "auto",
            }}
          >
            <div
              className="d-flex justify-content-end"
              onClick={() => setShowAddition(false)}
              style={{ cursor: "pointer" }}
            >
              <ClearIcon />
              {/* X */}
            </div>
            <div className="w-50">
              <label for="formFileLg" class="form-label">
                upload an image
              </label>
              <input
                class="form-control form-control-lg"
                id="formFileLg"
                accept="image/*"
                type="file"
                placeholder="Upload Photo"
                onChange={(event) => setPhoto(event.target.files[0])}
                required
              />
            </div>
            <div className="d-flex mt-4">
              <button
                type="button"
                class="btn btn-outline-primary"
                onClick={() => handleSubmition()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
}

export default StudentGallery;
